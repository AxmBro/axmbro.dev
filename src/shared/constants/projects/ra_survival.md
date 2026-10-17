---
title: Ra Survival
extraButtons:
  - text: Radium YouTube
    href: https://www.youtube.com/@Radium-Ra-88
    external: true
credits:
  - role: UI Developer
    name: AxmBro
    href: https://github.com/AxmBro
  - role: Project Lead
    name: Radium
    href: https://github.com/DirtyDan-555
videos:
  - title: Everything In Action
    description: >-
      A development video that shows every element I built, with all of its
      animations.
    youtubeId: VT4UAmooF2E
  - title: Custom Inventory Screen
    description: >-
      A development video of the inventory screen, with its open and close
      animations.
    youtubeId: 1BAl75sganU
imageSections:
  - title: In-game Screenshots
    description: >-
      In-game screenshots of the UI I built for this map. Some elements already
      existed, so this list shows only my own work.
    items:
      - title: Hotbars
        description: The vanilla hotbar is split into 3 sections.
        imageSrc: ra2
      - title: Hotbar Close-Up
        description: >-
          Slots can lock based on the item inside. A locked slot can still be
          selected, but it has no selected texture and is a little faded.
        imageSrc: ra1
      - title: Hotbar Slot Opacity
        description: >-
          When a slot holds a special item, the slot is faded and the selected
          texture is hidden. This tells the player that they cannot use this
          slot.
        imageSrc: ra17
      - title: Special Round Animation
        description: Plays when the player starts the game.
        imageSrc: ra18
      - title: Special Round Animation End
        description: >-
          The end of the round-start animation. It is easier to see in the
          development video above.
        imageSrc: ra19
      - title: Round Counter
        description: >-
          Sits in the bottom left corner and shows the current round number.
          The number animates when the round changes. It also flashes and turns
          dark red in time with the three bell sounds.
        imageSrc: ra6
      - title: Round Counter Close-Up
        description: Can show rounds as Roman numerals or normal numbers.
        imageSrc: ra7
      - title: Gun Display
        description: >-
          Sits in the bottom right corner and shows the current gun icon, name,
          and ammo. It slides in when the player switches guns.
        imageSrc: ra3
      - title: Gun Display Close-Up
        description: When ammo is low, the color changes to light red.
        imageSrc: ra4
      - title: Low Ammo Warning
        description: >-
          When ammo is very low, the color changes to dark red and text appears
          under the crosshair. The text has a short entry animation.
        imageSrc: ra5
      - title: Power-Ups
        description: >-
          Sits above the hotbars. When the player collects a power-up, it plays
          entry and exit animations.
        imageSrc: ra9
      - title: All Power-Ups
        description: >-
          When the player has several power-ups at once, they spread out from
          the middle so all of them fit. Each one has entry and exit animations.
        imageSrc: ra8
      - title: Perks
        description: >-
          Sits in the bottom left corner, above the round counter. Shows which
          buffs the player has.
        imageSrc: ra10
      - title: Perks Close-Up
        description: >-
          Icons have custom entry, exit, and close animations. They stay aligned
          to the left side.
        imageSrc: ra11
      - title: Crosshair Notifications
        description: Shows quick messages to the player.
        imageSrc: ra12
      - title: Crosshair Notifications Close-Up
        description: >-
          Messages have entry and exit animations. Up to 4 lines can stack.
        imageSrc: ra13
      - title: Hurt Flash
        description: >-
          When the player takes damage and their health is not low, a light red
          overlay appears.
        imageSrc: ra14
      - title: Doubled Hurt Flash
        description: >-
          When health is very low, the overlay is twice as strong. Both states
          have entry and exit animations.
        imageSrc: ra15
      - title: Electric Flash
        description: >-
          When the player walks through an electric trap, a blue overlay fades
          in and then fades out.
        imageSrc: ra16
      - title: HUD Visibility (Technical)
        description: >-
          A custom command shows or hides the HUD during gameplay.
        imageSrc: ra20
      - title: Crosshair Visibility (Technical)
        description: >-
          Works like the HUD toggle, but only for the custom crosshair.
        imageSrc: ra21
  - title: Custom Inventory Screen
    description: >-
      A simple inventory layout that updates instantly, with no reloads. I built
      it with a custom technique instead of server forms.
    items:
      - title: Custom Inventory Screen
        description: >-
          Split into elements that can update. Every part of this screen can be
          changed.
        imageSrc: ra22
---

Ra Survival is a Minecraft Bedrock map by [Radium](https://www.radium-studio.com/), inspired by the Zombies mode in Call of Duty. I was hired to build its UI in JsonUI: hotbars, a gun display, a round counter, power-ups, perks, crosshair notifications, and a custom inventory screen. I built all the UI logic and animations from the provided textures - [watch the showcase video](#showcase-video) to see them work. The map is still in development, so textures, icons, and design may change.

Similar HUD commission work: [Mineville UI](/projects/mineville_ui).
