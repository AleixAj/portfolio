/**
 * The 3D side of the room page: the model, the lights, the camera that flies
 * between objects and the floating labels.
 *
 * Everything the visitor can click is in roomConfig.js. This file only reacts
 * to `focus` (which object is open) and reports clicks back up.
 *
 * The canvas renders on demand (frameloop="demand"): no frames at all while
 * nothing changes. Whatever changes the picture outside React (the camera
 * flying, a material tint, a texture that finishes loading) calls
 * `invalidate()` to ask for the next frame.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { PROJECTS } from '../consts/projects'
import { localize } from '../consts/lang'
import { HOBBIES_PHOTOS } from '../consts/hobbies'
import { MODEL_URL, MODEL_SCALE, MODEL_OFFSET, OVERVIEW, OVERVIEW_PORTRAIT, HOTSPOTS, HITBOXES, LAMP, MESH, toWorld, ownerOf } from './roomConfig'
import { tvTexture, monitorTexture, projectInfoTexture, skillTvTexture } from './screens'
import Bookshelf from './Bookshelf'

const HOVER_TINT = new THREE.Color('#22d3ee')
// The cat and Darth Vader go in the frames of the Marvel and Star Wars posters
const POSTER_A = HOBBIES_PHOTOS[0].src
const POSTER_B = HOBBIES_PHOTOS[2].src

// Frame-rate independent smoothing (same idea as THREE.MathUtils.damp)
const damp = (from, to, lambda, dt) => THREE.MathUtils.lerp(from, to, 1 - Math.exp(-lambda * dt))

/**
 * A drawing as a framed picture: the whole drawing, never cropped, centred on
 * a dark mat (passe-partout) that fills the rest of the frame. Painted on a
 * canvas with the frame's own proportions, so nothing gets stretched.
 */
function useFramedTexture(src, aspect) {
  const invalidate = useThree(s => s.invalidate)
  const texture = useMemo(() => {
    const h = 1024
    const w = Math.round(h * aspect)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#0d0e10'
    ctx.fillRect(0, 0, w, h)

    const tex = new THREE.CanvasTexture(canvas)
    // Like the screens, the poster UVs run bottom-up
    tex.flipY = true
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4

    const img = new Image()
    img.onload = () => {
      // The drawings are photos: trim a little off the edges (the table shows)
      const trim = 0.05
      const sx = img.width * trim, sy = img.height * trim
      const sw = img.width * (1 - trim * 2), sh = img.height * (1 - trim * 2)
      const pad = w * 0.07
      const s = Math.min((w - pad * 2) / sw, (h - pad * 2) / sh)
      const dw = sw * s, dh = sh * s
      ctx.drawImage(img, sx, sy, sw, sh, (w - dw) / 2, (h - dh) / 2, dw, dh)
      tex.needsUpdate = true
      invalidate()
    }
    img.src = src
    return tex
  }, [src, aspect, invalidate])
  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

function Room({ focus, hovered, setHovered, onSelect, lightsOn, projectIdx, tvSkill, texts, onReady }) {
  const { scene: original } = useGLTF(MODEL_URL, false, true)
  const invalidate = useThree(s => s.invalidate)

  // Own copy of the model and its materials, so the textures I swap here
  // never leak into the hero on the main page (useGLTF caches the scene).
  const { scene, meshes } = useMemo(() => {
    const copy = original.clone(true)
    const list = []
    copy.traverse((o) => {
      if (!o.isMesh) return
      o.material = o.material.clone()
      // The monitors' screens are curved and the casing behind them is flat, so
      // in the middle they almost touch and flicker as the camera moves
      // (z-fighting: a dark line that "moves" with the mouse). Pulling the
      // screens a hair forward in the depth test makes them always win.
      if (o.name.startsWith('pantalla1')) {
        o.material.polygonOffset = true
        o.material.polygonOffsetFactor = -4
        o.material.polygonOffsetUnits = -4
      }
      // What it looked like, for screens that go back to it (the left monitor)
      o.userData.baseMap = o.material.map
      o.userData.baseEmissiveMap = o.material.emissiveMap
      o.userData.owner = ownerOf(o.name)
      o.userData.baseEmissive = o.material.emissive.clone()
      o.userData.baseIntensity = o.material.emissiveIntensity
      list.push(o)
    })
    return { scene: copy, meshes: list }
  }, [original])

  const find = (prefix) => meshes.find(m => m.name.startsWith(prefix))

  // The copied materials are ours to free when leaving the room (the shared
  // geometry and original textures stay cached for the hero)
  useEffect(() => () => meshes.forEach(m => m.material.dispose()), [meshes])

  // Tell the page the room is on screen, so the loader can go
  useEffect(() => { onReady?.() }, [onReady])

  // Screens: the TV and the right monitor show my own pictures
  const setScreen = (mesh, tex) => {
    if (!mesh) return
    mesh.material.map = tex
    mesh.material.emissiveMap = tex
    mesh.material.emissive.set('#ffffff')
    mesh.userData.baseEmissive = mesh.material.emissive.clone()
    mesh.material.needsUpdate = true
    invalidate()
  }

  // TV: "my stack" title card, or the technology picked in the Skills panel
  useEffect(() => {
    const tex = tvSkill ? skillTvTexture(tvSkill, invalidate) : tvTexture(texts.tv)
    setScreen(find(MESH.tv), tex)
    return () => tex.dispose()
  }, [texts.tv, tvSkill]) // eslint-disable-line react-hooks/exhaustive-deps

  // Monitor: the project picked in the Projects panel
  useEffect(() => {
    const tex = monitorTexture(PROJECTS[projectIdx], texts.monitorLabel, invalidate)
    setScreen(find(MESH.monitor), tex)
    return () => tex.dispose()
  }, [projectIdx, texts.monitorLabel]) // eslint-disable-line react-hooks/exhaustive-deps

  // Left monitor: that project's details while the Projects panel is open,
  // its own desktop picture the rest of the time
  const showInfo = focus === 'projects'
  useEffect(() => {
    const mesh = find(MESH.infoMonitor)
    if (!mesh || !showInfo) return
    const { title, details } = PROJECTS[projectIdx]
    const { lang } = texts
    // Not every project has a status (the older ones don't)
    const { status } = details
    const ok = status?.tone === 'ok'
    const tex = projectInfoTexture(title, {
      summary: localize(details.summary, lang),
      highlights: localize(details.highlights, lang),
      stack: details.stack,
      status: status && { ok, label: ok ? texts.projectInfo.status : texts.projectInfo.nextStep, text: localize(status, lang) },
    }, texts.projectInfo)
    const before = mesh.userData.baseEmissive
    setScreen(mesh, tex)
    return () => {
      mesh.material.map = mesh.userData.baseMap
      mesh.material.emissiveMap = mesh.userData.baseEmissiveMap
      mesh.material.emissive.copy(before)
      mesh.userData.baseEmissive = before
      mesh.material.needsUpdate = true
      tex.dispose()
      invalidate()
    }
  }, [showInfo, projectIdx, texts.lang, texts.projectInfo]) // eslint-disable-line react-hooks/exhaustive-deps

  // Posters: my drawings, slightly lit so they read in the dark
  const posterA = useFramedTexture(POSTER_A, 90.6 / 141.8)
  const posterB = useFramedTexture(POSTER_B, 105 / 188.1)
  useEffect(() => {
    ;[[MESH.posterA, posterA], [MESH.posterB, posterB]].forEach(([name, tex]) => {
      const mesh = find(name)
      if (!mesh) return
      mesh.material.map = tex
      mesh.material.emissiveMap = tex
      mesh.material.emissive.set('#a3a3a3')
      mesh.userData.baseEmissive = mesh.material.emissive.clone()
      mesh.material.needsUpdate = true
    })
    invalidate()
  }, [posterA, posterB]) // eslint-disable-line react-hooks/exhaustive-deps

  // Hover glow: a cyan tint on whatever belongs to the hovered object.
  // The lava lamp glows a bit brighter at night (it's the room's night light).
  useEffect(() => {
    meshes.forEach((m) => {
      const owner = m.userData.owner
      const on = owner && owner === hovered && owner !== focus
      m.material.emissive.copy(m.userData.baseEmissive)
      const base = m.userData.baseIntensity * (owner === 'lamp' && !lightsOn ? 1.4 : 1)
      if (on) {
        if (m.material.emissiveMap) m.material.emissiveIntensity = base * 1.6
        else m.material.emissive.lerp(HOVER_TINT, 0.35)
      } else {
        m.material.emissiveIntensity = base
      }
    })
    invalidate()
  }, [hovered, focus, lightsOn, meshes, invalidate])

  return (
    <group scale={MODEL_SCALE} position={MODEL_OFFSET}>
      <primitive object={scene} />
      <Hitboxes setHovered={setHovered} onSelect={onSelect} />
      <Bookshelf jobs={texts.shelf.jobs} courses={texts.shelf.courses} glow={hovered === 'journey' || focus === 'journey'} />
    </group>
  )
}

// Only events that start on the canvas itself count. The floating labels live
// in the same container, so a click on a label would otherwise also reach the
// scene and be undone ("clicked on nothing, back to the overview").
const onCanvas = (e) => e.nativeEvent?.target?.tagName === 'CANVAS'

/**
 * The invisible click areas from roomConfig: the only things in the scene with
 * pointer handlers, so hover and click test a few boxes instead of the whole
 * model (~390k triangles) on every mouse move. They're bigger than the objects
 * and nothing in front of them (the chair...) gets in the way.
 */
function Hitboxes({ setHovered, onSelect }) {
  return Object.entries(HITBOXES).flatMap(([owner, boxes]) =>
    boxes.map(([center, size], i) => (
      <mesh
        key={`${owner}-${i}`}
        name={`hit_${owner}`}
        position={center}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(owner) }}
        onPointerOut={() => setHovered(h => (h === owner ? null : h))}
        onClick={(e) => {
          if (!onCanvas(e)) return
          e.stopPropagation()
          // Touch has no "pointer out", so clear the glow before opening anything
          setHovered(null)
          onSelect(owner)
        }}
      >
        <boxGeometry args={size} />
        <meshBasicMaterial visible={false} />
      </mesh>
    )),
  )
}

/** Night light: screens and accents. "Lights on" adds a warm, even light. */
function Lights({ lightsOn }) {
  const ambient = useRef()
  const sun = useRef()
  const invalidate = useThree(s => s.invalidate)
  useEffect(() => { invalidate() }, [lightsOn, invalidate])
  useFrame((state, dt) => {
    if (!ambient.current || !sun.current) return
    const a = lightsOn ? 1.1 : 0.12
    const b = lightsOn ? 1.6 : 0
    const d = Math.min(dt, 0.25)
    ambient.current.intensity = damp(ambient.current.intensity, a, 4, d)
    sun.current.intensity = damp(sun.current.intensity, b, 4, d)
    // Keep drawing only while the light is still fading
    if (Math.abs(ambient.current.intensity - a) > 0.002 || Math.abs(sun.current.intensity - b) > 0.002) state.invalidate()
  })
  return (
    <>
      <ambientLight ref={ambient} intensity={0.12} />
      <directionalLight ref={sun} position={toWorld([1600, 1500, 1500])} intensity={0} color="#fff1e0" />
      {/* Monitors */}
      <pointLight position={toWorld([760, 700, 320])} intensity={6} distance={6} decay={1.6} color="#7c5cff" />
      {/* TV */}
      <pointLight position={toWorld([310, 700, 300])} intensity={5} distance={5} decay={1.6} color="#22d3ee" />
      {/* Lava lamp */}
      <pointLight position={toWorld([528, 640, 940])} intensity={3} distance={4} decay={1.8} color="#3b5bff" />
      {/* Moonlight through the windows */}
      <directionalLight position={toWorld([-600, 1400, 600])} intensity={0.5} color="#6aa8ff" />
    </>
  )
}

/**
 * Moves the camera smoothly to the overview or to the open object.
 * On desktop the open panel covers the right side, so the picture is shifted
 * left (view offset) to keep the object in the visible part. On mobile the
 * panel is a bottom sheet, so it shifts up instead.
 */
function CameraRig({ focus, panelOpen, reduceMotion }) {
  const camera = useThree(s => s.camera)
  const look = useRef(new THREE.Vector3(...toWorld(OVERVIEW.look)))
  const shift = useRef({ x: 0, y: 0 })
  const goalRef = useRef(new THREE.Vector3())
  const goalLookRef = useRef(new THREE.Vector3())

  // A new target: start drawing again (the rig keeps asking until it arrives)
  const invalidate = useThree(s => s.invalidate)
  useEffect(() => { invalidate() }, [focus, panelOpen, invalidate])

  // Start further away so the room "arrives" when the page opens
  useEffect(() => {
    const cam = new THREE.Vector3(...toWorld(OVERVIEW.cam))
    const target = new THREE.Vector3(...toWorld(OVERVIEW.look))
    camera.position.copy(target).add(cam.sub(target).multiplyScalar(reduceMotion ? 1 : 1.9))
    camera.lookAt(target)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((state, dt) => {
    const { camera, size } = state
    const goal = goalRef.current
    const goalLook = goalLookRef.current
    const spot = HOTSPOTS.find(h => h.id === focus && !h.action)
    const portrait = size.width < size.height
    const pose = spot ?? (portrait ? OVERVIEW_PORTRAIT : OVERVIEW)
    goal.set(...toWorld(pose.cam))
    goalLook.set(...toWorld(pose.look))

    // Narrow screens see less of the room, so step back a bit
    const aspect = size.width / size.height
    const back = THREE.MathUtils.clamp(1.45 / aspect, 1, spot ? 1.5 : 2.7)
    goal.sub(goalLook).multiplyScalar(back).add(goalLook)

    const speed = reduceMotion ? 12 : 2.6
    // Time-based, so slow devices (few frames) still arrive on time. Capped so a
    // long pause (switching tabs) doesn't make it jump.
    const d = Math.min(dt, 0.25)
    camera.position.x = damp(camera.position.x, goal.x, speed, d)
    camera.position.y = damp(camera.position.y, goal.y, speed, d)
    camera.position.z = damp(camera.position.z, goal.z, speed, d)
    look.current.x = damp(look.current.x, goalLook.x, speed, d)
    look.current.y = damp(look.current.y, goalLook.y, speed, d)
    look.current.z = damp(look.current.z, goalLook.z, speed, d)
    camera.lookAt(look.current)

    const desktop = size.width >= 768
    const tx = panelOpen && desktop ? Math.min(size.width * 0.42, 520) / 2 : 0
    const ty = panelOpen && !desktop ? size.height * 0.27 : 0
    shift.current.x = damp(shift.current.x, tx, speed, d)
    shift.current.y = damp(shift.current.y, ty, speed, d)
    camera.setViewOffset(size.width, size.height, shift.current.x, shift.current.y, size.width, size.height)
    camera.updateProjectionMatrix()

    // Still on its way? Then ask for another frame; once there, stop drawing
    const moving = camera.position.distanceTo(goal) > 0.001 || look.current.distanceTo(goalLook) > 0.001 ||
      Math.abs(shift.current.x - tx) > 0.25 || Math.abs(shift.current.y - ty) > 0.25
    if (moving) state.invalidate()
  })

  useEffect(() => () => {
    camera.clearViewOffset()
    camera.updateProjectionMatrix()
  }, [camera])

  return null
}

/** Floating labels over each object. Real buttons, so they work with the keyboard too. */
function Markers({ focus, hovered, setHovered, onSelect, labels, lampLabel }) {
  if (focus) return null
  return (
    <>
      {HOTSPOTS.map((h, i) => (
        <Html key={h.id} position={toWorld(h.marker)} center zIndexRange={[30, 0]}>
          <button
            type="button"
            onClick={() => { setHovered(null); onSelect(h.id) }}
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(h.id) }}
            onPointerLeave={() => setHovered(null)}
            aria-label={labels[h.id]}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full border p-1 md:pl-1.5 md:pr-3 md:py-1 text-xs md:text-sm font-semibold transition-colors ${hovered === h.id
              ? 'border-cyan-300 bg-cyan-400 text-black'
              : 'border-cyan-400/50 bg-black/85 text-white'}`}
          >
            <span className={`room-marker-dot flex h-5 w-5 items-center justify-center rounded-full font-tech text-[0.6rem] ${hovered === h.id ? 'bg-black text-cyan-300' : 'bg-cyan-400 text-black'}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            {/* Only the number on phones, the names are in the dock below */}
            <span className="hidden md:inline">{labels[h.id]}</span>
          </button>
        </Html>
      ))}
      <Html position={toWorld(LAMP.marker)} center zIndexRange={[30, 0]}>
        <button
          type="button"
          onClick={() => onSelect('lamp')}
          aria-label={lampLabel}
          title={lampLabel}
          className="room-marker-dot flex h-6 w-6 items-center justify-center rounded-full border border-indigo-300/60 bg-indigo-500/40 text-[0.7rem] text-white"
        >
          ✦
        </button>
      </Html>
    </>
  )
}

export default function RoomScene({ focus, onSelect, lightsOn, projectIdx, tvSkill, texts, reduceMotion, onReady }) {
  const [hovered, setHovered] = useState(null)

  // Pointer cursor over anything clickable
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : ''
    return () => { document.body.style.cursor = '' }
  }, [hovered])

  return (
    <>
      <CameraRig focus={focus} panelOpen={Boolean(focus)} reduceMotion={reduceMotion} />
      <Lights lightsOn={lightsOn} />
      <Room
        focus={focus}
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        lightsOn={lightsOn}
        projectIdx={projectIdx}
        tvSkill={tvSkill}
        texts={texts}
        onReady={onReady}
      />
      <Markers focus={focus} hovered={hovered} setHovered={setHovered} onSelect={onSelect} labels={texts.labels} lampLabel={texts.lamp} />
    </>
  )
}
