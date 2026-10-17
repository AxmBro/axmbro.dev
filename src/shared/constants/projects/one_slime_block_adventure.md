---
title: One Slime Block Adventure
extraButtons:
  - text: Mush Co Website
    href: https://www.mushco.games/games
    external: true
credits:
  - role: UI Developer
    name: AxmBro
    href: https://github.com/AxmBro
  - role: Studio
    name: Mush Co Team
    href: https://www.mushco.games/
videos:
  - title: Trailer
    description: >-
      The official trailer, showing the custom UI and the gameplay of the map.
    youtubeId: xznuwBypHg4
  - title: HUD elements
    description: >-
      A development video that shows every HUD element in detail. This is raw
      footage, recorded before the system that runs all these elements
      together was finished.
    youtubeId: 6s0IVXjuDXE
  - title: Map Form
    description: A development video that shows the map form in detail.
    youtubeId: kg8VKkPnY6g
imageSections:
  - title: In-game HUD Screenshots
    description: In-game screenshots of all the custom HUD elements built for this map.
    items:
      - title: Locations
        description: >-
          Location names on a small leaf graphic in the top-left corner. They
          show the player's current area.
        imageSrc: osba1
      - title: Locations Close-Up
        description: The text changes instantly, with no transition animation.
        imageSrc: osba2
      - title: Coin Counter
        description: >-
          Sits in the top-right corner with the other counters. The number
          changes instantly, and the coin plays different animations for
          different events.
        imageSrc: osba3
      - title: Coin Counter Close-Up
        description: >-
          The coin always spins by default and plays extra animations on
          certain actions.
        imageSrc: osba4
      - title: Enemy Counter
        description: >-
          Works like the coin counter - the number updates and plays an update
          animation.
        imageSrc: osba5
      - title: Death Counter
        description: Works the same way as the enemy counter.
        imageSrc: osba6
      - title: Objectives
        description: >-
          Shown below the other elements in the top-right corner. Their text and
          texture can change.
        imageSrc: osba7
      - title: Objectives Close-Up
        description: Objectives also have entry and exit animations.
        imageSrc: osba8
      - title: Firework Indicator
        description: A simple animation that shows each time the player uses a firework.
        imageSrc: osba9
      - title: Elytra Flight Animation
        description: Shows when the player is flying with an elytra.
        imageSrc: osba10
      - title: Chibi Character
        description: >-
          Sits near the hotbar and plays many animations based on what the
          player is doing.
        imageSrc: osba11
      - title: Chibi Character Close-Up
        description: This view shows all 23 actions the character can play.
        imageSrc: osba12
      - title: Mecha Display
        description: >-
          Shows when the player is in a mecha. It plays idle animations, and
          extra animations each time the player shoots.
        imageSrc: osba13
      - title: Custom Title
        description: >-
          Built because the map used the default title a lot, and its fixed
          behavior did not give the control the project needed.
        imageSrc: osba14
      - title: Custom Title With Icons
        description: >-
          The custom title also shows icons for player progress - how many
          bosses are defeated and how many are left.
        imageSrc: osba16
      - title: Custom Actionbar
        description: >-
          Built for the same reason as the custom title - the map used the
          default action bar a lot.
        imageSrc: osba15
      - title: Custom Boss Bars
        description: Custom boss bars built from scratch to match the map's style.
        imageSrc: osba21
      - title: Custom Boss Bars Close-Up
        description: >-
          Every part can be customized. The bar can also show a dazed text and
          icon, both fully animated.
        imageSrc: osba22
      - title: Custom Hotbar Slots
        description: >-
          Made as a single image, which was the better solution on the technical
          side.
        imageSrc: osba24
      - title: Custom Inventory Look
        description: >-
          On the technical side this is also a single image, and it was not easy
          to fit into the UI.
        imageSrc: osba23
      - title: Black Bars
        description: >-
          They do not look like much in a still image, but they have special
          entry and exit animations.
        imageSrc: osba17
      - title: First Loading Screen
        description: A simple loading texture that fills the whole screen.
        imageSrc: osba18
      - title: Second Loading Screen
        description: >-
          It shows on top of all screens, so players cannot see what is
          happening in the game.
        imageSrc: osba19
      - title: UI Visibility Toggle
        description: >-
          A custom function that shows or hides the HUD with commands.
        imageSrc: osba20
  - title: In-game Map Form Screenshots
    description: >-
      A custom map form with an entry animation and locked regions that unlock
      as players defeat bosses. It was the most complex part of the project.
    items:
      - title: Map Entry
        description: >-
          The first time the map form opens, an animation plays at the bottom.
          All elements and actions are locked, because no dimensions are
          unlocked yet.
        imageSrc: osba25
      - title: Early Map Phase
        description: A phase after the start. Players can teleport to any region they have unlocked.
        imageSrc: osba26
      - title: Late Map Phase
        description: >-
          As players progress, more map regions and defeated bosses appear on
          the map.
        imageSrc: osba27
      - title: Final Map
        description: The map when all bosses are defeated.
        imageSrc: osba28
---

One Slime Block Adventure is a large Minecraft Bedrock adventure map made with the YouTuber Slime Block and [Mush Co](https://www.mushco.games/). It was my first large commission and one of my most complex projects. I built the full custom UI in JsonUI - the in-game HUD, the forms, and a custom map form. The artist vemigvan made the textures, and I turned them into a working UI system.

The map is out now on the [Minecraft Marketplace](https://www.minecraft.net/en-us/marketplace/pdp/mush-co/one-slime-block-adventure/ade4af56-a677-445d-a6ed-628e28eb7d88).
