# @gaiaengine/2d

A TypeScript/ES module built on top of [Pixi.js](https://pixijs.com/) and
inspired by [@commonmodule/ts](https://github.com/commonmodule/ts-module). It
provides a lightweight 2D game engine framework with:

- **Core Node Hierarchy** (`GameNode`, `DisplayNode`, `TransformableNode`, etc.)
- **Collision Detection** (shapes, polygon collision, broad-phase management)
- **Resource Loading** (textures, spritesheets, audio, text, binary)
- **Tile-Based Map Rendering** (rectangular grid system, layered terrain and
  objects)
- **UI Components** (joystick, DOM overlays, debug displays)
- **Sound and Music** (background music, sound effects, volume management)
- **Scenes and Camera** (game scenes, camera movement, zoom, panning)
- **Shape Nodes** (circles, ellipses, rectangles with optional fill/stroke)

---

## Table of Contents

1. [Installation](#installation)
2. [API Reference](#api-reference)
   - [Collision](#collision)
     - [Collidable & Colliders](#collidable--colliders)
     - [CollisionChecker](#collisionchecker)
     - [CollisionDetector & ZoneCollisionDetector](#collisiondetector--zonecollisiondetector)
   - [Core](#core)
     - [GameNode](#gamenode)
     - [DisplayNode](#displaynode)
     - [TransformableNode](#transformablenode)
     - [WindowEventNode](#windoweventnode)
     - [Movable](#movable)
     - [StateSet](#stateset)
     - [Coordinates](#coordinates)
     - [compareCoordinates()](#comparecoordinates)
   - [Debug Utilities](#debug-utilities)
     - [DebugManager](#debugmanager)
     - [DebugDisplay](#debugdisplay)
     - [DebugColliderDrawNode](#debugcolliderdrawnode)
   - [Timers & Delays](#timers--delays)
     - [Delay](#delay)
     - [Interval](#interval)
   - [DOM Wrapper](#dom-wrapper)
     - [DomWrapperNode](#domwrappernode)
     - [DomTextNode](#domtextnode)
   - [Image & Sprites](#image--sprites)
     - [BaseImageSprite](#baseimagesprite)
     - [Sprite](#sprite)
     - [AnimatedSprite](#animatedsprite)
     - [Background](#background)
   - [Input](#input)
     - [Joystick & CrossPlatformJoystick](#joystick--crossplatformjoystick)
   - [Loading Resources](#loading-resources)
     - [TextureLoader](#textureloader)
     - [SpritesheetLoader](#spritesheetloader)
     - [AudioBufferLoader](#audiobufferloader)
     - [BinaryLoader](#binaryloader)
     - [TextLoader](#textloader)
     - [BitmapFontLoader](#bitmapfontloader)
     - [ResourcePreloader](#resourcepreloader)
   - [Tile Maps](#tile-maps)
     - [RectMap](#rectmap)
     - [RectMapObject & RectMapTerrain](#rectmapobject--rectmapterrain)
     - [AnimatedRectMapObject & AnimatedRectMapTerrain](#animatedrectmapobject--animatedrectmapterrain)
     - [MapData](#mapdata)
     - [TerrainDirection](#terraindirection)
   - [Particles](#particles)
     - [ParticleSystem](#particlesystem)
   - [Scenes & Camera](#scenes--camera)
     - [Scene](#scene)
     - [Camera](#camera)
     - [TransitionOverlay](#transitionoverlay)
   - [Screens & Layers](#screens--layers)
     - [GameScreen](#gamescreen)
     - [Fullscreen](#fullscreen)
     - [LetterboxedScreen](#letterboxedscreen)
     - [PanZoomGameScreen](#panzoomgamescreen)
     - [Layer](#layer)
     - [SuperRootNode](#superrootnode)
   - [Shape Nodes](#shape-nodes)
     - [ShapeNode](#shapenode)
     - [CircleNode](#circlenode)
     - [EllipseNode](#ellipsenode)
     - [RectangleNode](#rectanglenode)
   - [Audio & Sound](#audio--sound)
     - [AudioContextManager](#audiocontextmanager)
     - [BackgroundMusic](#backgroundmusic)
     - [RandomSoundLooper](#randomsoundlooper)
     - [Sound](#sound)
     - [SoundEffectsPlayer](#soundeffectsplayer)
     - [VolumeManager](#volumemanager)
   - [Text & Fonts](#text--fonts)
     - [BitmapFont](#bitmapfont)
     - [BitmapTextNode](#bitmaptextnode)
     - [TextNode](#textnode)
   - [Zoning & Broad-Phase](#zoning--broad-phase)
     - [ZoneManager](#zonemanager)
   - [Configuration](#configuration)
     - [GaiaEngineConfig](#gaiaengineconfig)
3. [Usage Examples](#usage-examples)
4. [Contributing](#contributing)
5. [License](#license)

---

## Installation

```bash
npm install @gaiaengine/2d
# or
yarn add @gaiaengine/2d
```

> **Note**: This library internally depends on Pixi.js (`^7.2.4`) and also
> references [@commonmodule/ts](https://github.com/commonmodule/ts-module) for
> event and resource loading utilities. Make sure these are also installed or
> available in your environment.

---

## API Reference

### Collision

#### Collidable & Colliders

- **Collidable**: An interface indicating an object has an array of `colliders`
  and a `globalTransform` to place them in the game world.
  ```ts
  export default interface Collidable {
    colliders: Collider[];
    globalTransform: Transform;
  }
  ```

- **Collider**: A type union for shape definitions used in collision:
  ```ts
  type Collider =
    | RectCollider
    | CircleCollider
    | EllipseCollider
    | PolygonCollider;
  ```
- Colliders include:
  - **BaseCollider**: minimal `x`, `y` offset.
  - **RectCollider**: rectangle with `width`, `height`.
  - **CircleCollider**: circle with `radius`.
  - **EllipseCollider**: ellipse with `width`, `height`.
  - **PolygonCollider**: polygon with a set of `{ x, y }` points.

- **ColliderType**: enum to identify shape type:
  ```ts
  enum ColliderType {
    Rectangle,
    Circle,
    Ellipse,
    Polygon,
  }
  ```

#### CollisionChecker

A static utility class that checks collision between any two colliders of known
type. Methods include:

- `checkCollision(colliderA, transformA, colliderB, transformB)`
- `rectRectCollision(...)`
- `circleCircleCollision(...)`
- `rectCircleCollision(...)`
- `polygonPolygonCollision(...)`
- _and many more specialized checks_

It also provides point-inside shape checks, line-line intersection checks, and
internal methods to approximate shapes (like `approximateCircle`,
`approximateEllipse`) for polygon-based intersection tests.

#### CollisionDetector & ZoneCollisionDetector

- **CollisionDetector**: A game node that holds two lists: `subjects` and
  `obstacles`. For each frame, it checks collisions between every subject and
  obstacle and calls `onCollision(subject, obstacle)` if they overlap.
- **ZoneCollisionDetector**: Extends `CollisionDetector` but uses a
  `ZoneManager` for broad-phase optimization. Subjects are tested only against
  obstacles in nearby zones.

---

### Core

#### GameNode

- A fundamental tree node for building a scene graph.
- It extends `EventTreeNode` (from `@commonmodule/ts`) and maintains a
  parent-child relationship.
- `append(...)` and `remove()` let you build or tear down node hierarchies.
- `update(deltaTime: number)` is called every frame (or on your chosen loop) to
  update this node and its children.

#### DisplayNode

- Extends `TransformableNode` but holds a Pixi.js `Container` (or subclass).
- Syncs `x`, `y`, `scale`, `rotation`, and `alpha` with the underlying Pixi
  display object.
- Example usage:
  ```ts
  class CustomDisplayNode extends DisplayNode {
    constructor() {
      super(new Container());
    }
    // ...
  }
  ```

#### TransformableNode

- A `GameNode` with position, scale, rotation, and alpha.
- Maintains both `transform` (local) and `globalTransform`.
- Typically extended by `DisplayNode` or `GameObject`.

#### WindowEventNode

- A specialized `GameNode` that can bind window-level events (e.g. `keydown`,
  `resize`) via `onWindow("event", callback)`.
- Automatically unbinds them when removed.

#### Movable

- A `GameObject` subclass adding velocity, acceleration, min/max speeds, and
  optional bounds.
- `move(radian, speed)` or `moveTo(x, y, speed, onArrive?)` for basic movement
  logic.
- `stop()` to reset speed.

#### StateSet

- A utility class that handles a set of states (each state is a `GameObject`).
  Only one state is visible at a time.
- e.g., `Idle`, `Running`, `Jumping` states each with their own display object.

#### Coordinates

A simple interface `{ x: number; y: number }`.

#### compareCoordinates()

Utility function to check if two coordinates are the same.

---

### Debug Utilities

#### DebugManager

- Tracks debug statistics, e.g. `displayNodeCount`.

#### DebugDisplay

- A `GameObject` that shows a small overlay of FPS and current node count.
- Appends a text node to the DOM, typically used in dev mode.

#### DebugColliderDrawNode

- A `GameObject` that draws the collider shapes (`RectCollider`,
  `CircleCollider`, etc.) as outlines for debugging.
- Typically appended to the same parent that has `colliders`.

---

### Timers & Delays

#### Delay

- A `GameNode` that waits a specified duration (`delayDuration`) before invoking
  a callback, then removes itself.

#### Interval

- A `GameNode` that invokes a callback periodically every `intervalDuration`
  seconds, akin to `setInterval`, but in the game update loop.
- Optionally starts immediately (`startImmediately`).

---

### DOM Wrapper

#### DomWrapperNode

- A subclass of `TransformableNode` that wraps a `DomNode` from
  [@commonmodule/app](https://github.com/commonmodule/app-module).
- Positions the DOM element in absolute coordinates synchronized with the
  engine’s `globalTransform` and the current screen scale.

#### DomTextNode

- A `DomWrapperNode` specialized for text content.
- `this.domNode.text = "...";` sets the textual content.

---

### Image & Sprites

#### BaseImageSprite

- An abstract `GameObject` that loads and manages a single texture.
- `src` property triggers a load.
- Subclassed by `Sprite` and `Background`.

#### Sprite

- A `BaseImageSprite` that uses either a direct image or a spritesheet frame.
- If using a spritesheet + `Atlas`, it references a specific frame ID.

#### AnimatedSprite

- Similar usage to `Sprite`, but if you have multiple frames in the
  `atlas.animations`, it constructs a Pixi `AnimatedSprite`.
- Can set `animation`, `loop`, `fps`, and handle `onAnimationEnd`.

#### Background

- A special `BaseImageSprite` that uses a Pixi `TilingSprite`.
- Allows setting `scrollSpeedX`, `scrollSpeedY` for parallax or scrolling
  backgrounds.

---

### Input

#### Joystick & CrossPlatformJoystick

- **Joystick**: A simple arrow-key-based or WASD-like input class that triggers
  `onMove(radian)` or `onRelease()`. Also tracks pressed keys.
- **CrossPlatformJoystick**: Extends `Joystick`, adding mobile touch-based
  controls with an on-screen joystick `DomNode`.
  - It draws a background “joystick ring” and a “knob”.
  - Fires the same callbacks as `Joystick` but uses touch events.

---

### Loading Resources

#### TextureLoader

- Extends `ResourceLoader<Texture>` from `@commonmodule/ts`.
- Loads images into Pixi `Texture` objects.
- Uses reference counting and frees them when no longer in use.

#### SpritesheetLoader

- Extends `ResourceLoader<Spritesheet>`.
- Given an ID, source URL, and a JSON `Atlas`, it loads the image and creates a
  Pixi `Spritesheet`.

#### AudioBufferLoader

- Extends `ResourceLoader<AudioBuffer>`.
- Fetches audio data, decodes it via `AudioContext.decodeAudioData`.

#### BinaryLoader

- Extends `ResourceLoader<Uint8Array>`.
- Fetches raw binary data from a URL.

#### TextLoader

- Extends `ResourceLoader<string>`.
- Fetches text files from a URL.

#### BitmapFontLoader

- Extends `ResourceLoader<BitmapFont>`.
- Parses `.fnt` XML data and related texture.
- Produces a `BitmapFont` with character metrics, line height, etc.

#### ResourcePreloader

- A helper class that can preload a list of resources (text, binary, texture,
  audio, or spritesheet) in parallel.

---

### Tile Maps

#### RectMap

- A `RectTileLoader` subclass for rendering a tile map with “rectangular tiles”.
- Maintains two layers: **terrainLayer** and **objectLayer**.
- Uses a `MapData` structure to determine which terrain or object ID should be
  placed at each tile coordinate.
- Supports additional “neighbors-based” tiles for corners or transitions.
- Implements deferred loading/unloading of tiles based on camera position (using
  `tileSize` and `extraLoadTileCount`).

#### RectMapObject & RectMapTerrain

- Basic classes that extend `Sprite` to represent static, single-frame map
  sprites, with optional fade-in (`fadeDuration`).

#### AnimatedRectMapObject & AnimatedRectMapTerrain

- Extend `AnimatedSprite`, allowing multiple-frame animations for map objects or
  terrains.
- Support a fade-in effect too.

#### MapData

- Defines the structure of the terrain, objects, frames, colliders, etc.
  ```ts
  interface MapData {
    terrains: { [id: string]: TerrainData };
    objects: { [id: string]: MapObjectData };
    terrainMap: { [cord: string]: string };
    mapObjects: { x: number; y: number; object: string }[];
  }
  ```
- `MapDataTransformer` can convert `MapData` into a set of Pixi `Atlas` data.

#### TerrainDirection

- An enum describing how to render partial/corner fill for transitions:
  - e.g. `TopLeft`, `FillTopRightBottom`, etc.

---

### Particles

#### ParticleSystem

- A `GameObject` for creating bursts of particles.
- Configurable spawn count, lifetime, direction, speed, fade speed, etc.
- Uses Pixi `Sprite` for each particle.

---

### Scenes & Camera

#### Scene

- An abstract `GameObject` subclass representing a screen or scene in your game.
- Typically manages its own nodes, background, UI, etc.
- `transitionTo(SomeOtherScene)` is an example method that can show a
  `TransitionOverlay`.

#### Camera

- A helper class associated with `GameScreen` to track camera position (`x`,
  `y`) and scale (zoom).
- `setPosition(x, y)`, set `scale`, etc.

#### TransitionOverlay

- A DOM-based fade overlay that transitions out the current scene and in a new
  one.
- Typically used by `Scene.transitionTo`.

---

### Screens & Layers

#### GameScreen

- The main rendering surface, built around a Pixi `Renderer` with an internal
  update loop using `requestAnimationFrame`.
- Has a root `SuperRootNode`, a `Camera`, and an optional set of named `Layer`
  objects.
- Accepts options for `width`, `height`, `backgroundColor`, `layers`,
  `pixelated`.

#### Fullscreen

- Extends `GameScreen`, automatically resizing to fill the browser window.
- Attaches to `document.body` and updates on `resize` events.

#### LetterboxedScreen

- Extends `GameScreen` to maintain aspect ratio with letterboxes (black bars).
- Uses additional DOM elements to fill in top/bottom/left/right letterbox
  regions.

#### PanZoomGameScreen

- Extends `GameScreen`, adding “click-and-drag to pan” and “mouse wheel to
  zoom.”
- Saves camera position & zoom in a persistent store.

#### Layer

- A simple `GameObject` used to group children with a specific `zIndex`.

#### SuperRootNode

- A top-level `GameObject` that sits inside the `GameScreen`’s renderer.
- Usually only used internally; direct parent for layers and the game’s main
  root node.

---

### Shape Nodes

#### ShapeNode

- An abstract `DisplayNode<Graphics>` that draws a shape on a Pixi `Graphics`.
- Subclassed by `CircleNode`, `EllipseNode`, `RectangleNode`.

#### CircleNode

- Draws a circle at (0,0) of a given radius.
- Optionally fill or stroke.

#### EllipseNode

- Draws an ellipse with `width`, `height`.

#### RectangleNode

- Draws a rectangle with `width`, `height`.
- Coordinates are centered by default (`-width/2, -height/2` offset).

---

### Audio & Sound

#### AudioContextManager

- A singleton that holds the `AudioContext`.
- Checks OGG support, ensures the context is resumed on user interaction.

#### BackgroundMusic

- Plays a set of looped music tracks (OGG or MP3).
- Randomly chooses among them, restarts on track end, etc.
- Integrates with `VolumeManager.backgroundMusicVolume`.

#### RandomSoundLooper

- Loops random sound effects from a set of sources at a certain volume.
- Pauses/resumes on mobile browser visibility changes.

#### Sound

- Wraps a single audio buffer playback in the `AudioContext`.
- Supports play, pause, stop, loop, volume, fade, etc.
- Reference counted by `AudioBufferLoader`.

#### SoundEffectsPlayer

- A singleton that plays short sound effects from a list of URLs, at random, or
  from a single URL.
- Respects `VolumeManager.soundEffectsVolume`.

#### VolumeManager

- A global volume manager storing two volumes: `backgroundMusicVolume` and
  `soundEffectsVolume`.
- Notifies all subscribed sounds or players on changes.

---

### Text & Fonts

#### BitmapFont

- Represents parsed `.fnt` data with a Pixi `Texture`.
- Has character metrics and size/lineHeight info.

#### BitmapTextNode

- A `GameObject` that lays out text glyphs using a loaded `BitmapFont`.
- Creates a separate Pixi `Sprite` for each character, aligned by the font
  metrics.

#### TextNode

- A `GameObject` that renders standard Pixi `Text`.
- Allows specifying style, anchor, and auto-loading custom fonts via a
  `FontLoader` from `@commonmodule/app`.

---

### Zoning & Broad-Phase

#### ZoneManager

- A `GameNode` that divides space into grid “zones”.
- For each frame, checks if objects have moved to a new zone and updates them
  accordingly.
- Ideal for broad-phase collision checks, used by `ZoneCollisionDetector`.

---

### Configuration

#### GaiaEngineConfig

- A simple config singleton with `isDevMode` flag.
- If `isDevMode` is `true`, certain debug behaviors are enabled (like
  `DebugDisplay` or console logs).

---

## Usage Examples

### 1. Creating a Simple GameScreen

```ts
import { Fullscreen, GameObject, Sprite } from "@gaiaengine/2d";

const screen = new Fullscreen({ backgroundColor: 0x222222 });
const player = new Sprite(100, 100, "player.png");

screen.root.append(player);

// animate loop is handled by the internal requestAnimationFrame
```

### 2. Adding Collision Detection

```ts
import {
  Collidable,
  CollisionDetector,
  GameObject,
  RectCollider,
} from "@gaiaengine/2d";

class Player extends GameObject implements Collidable {
  colliders = [
    { type: 0, width: 50, height: 50, x: 0, y: 0 }, // ColliderType.Rectangle=0
  ];
  // ...
}

class Obstacle extends GameObject implements Collidable {
  colliders = [
    { type: 0, width: 32, height: 32, x: 0, y: 0 },
  ];
  // ...
}

const detector = new CollisionDetector<Player, Obstacle>(
  (subject, obstacle) => {
    console.log("Collision detected between", subject, "and", obstacle);
  },
);
screen.root.append(detector);

const player = new Player();
const block = new Obstacle();

detector.addSubject(player);
detector.addObstacle(block);
```

### 3. Using a ParticleSystem

```ts
import { ParticleSystem } from "@gaiaengine/2d";

const particles = new ParticleSystem({
  src: "star.png",
  count: { min: 10, max: 20 },
  lifetime: { min: 0.5, max: 1.5 },
  direction: { min: 0, max: Math.PI * 2 },
  speed: { min: 50, max: 150 },
  scale: { min: 0.5, max: 1.0 },
  fadingSpeed: -1.0,
  rotationToDirection: false,
});

screen.root.append(particles);
particles.burst(200, 200);
```

### 4. Loading a RectMap

```ts
import {
  MapData,
  RectMap,
  ResourcePreloader,
  // ...
} from "@gaiaengine/2d";

const mapData: MapData = {
  terrains: {/* ... */},
  objects: {/* ... */},
  terrainMap: {/* "0,0": "grass", etc. */},
  mapObjects: [],
};

// Preload required textures/spritesheets
await ResourcePreloader.preloadResources([
  {
    type: "spritesheet",
    id: "my-spritesheet",
    src: "atlas.png",
    atlas: {/* ... */},
  },
]);

// Create a RectMap
const tileMap = new RectMap(
  32, // tile size in px
  { mySpritesheet: "atlas.png" }, // map of ID => src
  mapData, // the map data
  {
    extraLoadTileCount: 2,
    debounceDelay: 0.2,
    tileFadeDuration: 0.5,
  },
);
screen.root.append(tileMap);
```

---

## Contributing

1. **Fork** the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Make your changes and commit: `git commit -m "Add my feature"`.
4. Push the changes: `git push origin feature/my-feature`.
5. Open a **pull request**.

---

## License

This package is released under the **MIT License**. See [LICENSE](./LICENSE) for
details.

---

**Author**: [yj.gaia](https://github.com/yjgaia)\
**Inspired by**:
[@commonmodule/app](https://github.com/commonmodule/app-module)\
**Pixi.js**: [https://pixijs.com/](https://pixijs.com/)
