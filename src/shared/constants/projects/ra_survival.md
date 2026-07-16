---
title: Ra Survival
extraButtons:
  - text: Radium YouTube
    href: https://www.youtube.com/@Radium-Ra-88
    external: true
credits:
  - role: UI Engineer
    name: AxmBro
    href: https://github.com/AxmBro
  - role: Project Lead
    name: Radium
    href: https://github.com/DirtyDan-555
videos:
  - title: Everything In Action
    description: >-
      Take a look at this development video, which shows in details all elements
      created by me. Pay attention to all animations - something very rare to
      see in such complex projects!
    youtubeId: VT4UAmooF2E
  - title: Custom Inventory Screen
    description: >-
      Take a look at this development video, which shows extra open/close
      animations!
    youtubeId: 1BAl75sganU
imageSections:
  - title: In-game Screenshots
    description: >-
      In-game screenshots of the elements I created and added to this map. Some
      elements already existed, so this list covers only my own work.
    items:
      - title: Hotbars
        description: Classic vanilla layout has been changed to 3 sections.
        imageSrc: ra2
      - title: Closer look at hotbars
        description: >-
          With in-game items it gets more interesting. Slots can also lock based
          on the item inside - still selectable, but without the selected
          texture and slightly less visible.
        imageSrc: ra1
      - title: Opacity function in hotbars
        description: >-
          When player has special items in slot, they are less visible and
          selected texture is not visible at all - to indicate that player has
          no access to this slot.
        imageSrc: ra17
      - title: Special Round Animation
        description: Is played when player starts game.
        imageSrc: ra18
      - title: Ending of special round animation
        description: >-
          Transition out of the round-start animation. Best seen in the
          development video above.
        imageSrc: ra19
      - title: Rounds element
        description: >-
          Sits in the bottom left corner, showing the current round number with
          a smooth change animation when switching rounds. To match the three
          bell sounds, it flashes and shifts color to dark red.
        imageSrc: ra6
      - title: Closer look at rounds element
        description: Can display rounds as roman numerals or normal numbers.
        imageSrc: ra7
      - title: Gun display
        description: >-
          Sits in the bottom right corner, showing the current gun icon, name,
          and ammo, with a smooth slide animation when switching guns.
        imageSrc: ra3
      - title: Closer look at gun display
        description: When ammo is low, the color shifts to light red.
        imageSrc: ra4
      - title: Low ammo indicator
        description: >-
          When ammo is really low, color is changed to dark red and text appears
          under crosshair. Also with subtle entry animation!
        imageSrc: ra5
      - title: Power-Ups
        description: >-
          Another UI element above the hotbars. When the player collects a
          power-up, it plays entry and exit animations.
        imageSrc: ra9
      - title: All Power-Ups
        description: >-
          If player has more power-ups at the same time, they expand to fit
          everything in middle, of course with entry and exit animation!
        imageSrc: ra8
      - title: Perks
        description: >-
          Positioned in bottom left corner above rounds element, used to
          indicate that player has certain buffs.
        imageSrc: ra10
      - title: Closer look at perks
        description: >-
          Icons use custom entry, exit, and close animations, and stay stuck to
          the left side.
        imageSrc: ra11
      - title: Crosshair notifications
        description: Extra element for quick message to user.
        imageSrc: ra12
      - title: Closer look at crosshair notifications
        description: >-
          Messages have entry and exit animations and can stack up to 4 lines.
        imageSrc: ra13
      - title: Hurt Flash
        description: >-
          Whenever player receives damage and their health is not low, slightly
          red overlay appears.
        imageSrc: ra14
      - title: Doubled Hurt Flash
        description: >-
          When health is very low, overlay transparency is doubled. Both states
          have entry and exit animations.
        imageSrc: ra15
      - title: Electric Flash
        description: >-
          Is visible when player walks through electric trap, blue overlay
          appears with entry animation and disappears smoothly as well.
        imageSrc: ra16
      - title: UI visibility (technical)
        description: >-
          Custom command-driven toggle for HUD visibility during gameplay.
        imageSrc: ra20
      - title: Custom Crosshair visibility (technical)
        description: >-
          Same visibility control as the HUD, but for the custom crosshair only.
        imageSrc: ra21
  - title: Custom Inventory Screen
    description: >-
      A simple layout that updates instantly without any reloads. With a custom
      technique I built it this way instead of relying on server forms.
    items:
      - title: Custom Inventory Screen
        description: >-
          Separated by updatable elements. Everything you see there can be
          changed.
        imageSrc: ra22
---

A Minecraft Bedrock Edition map by [Radium](https://www.radium-studio.com/), inspired by Call of Duty's Zombies mode. I was commissioned to build the full UI, including hotbars, a gun display, round counters, power-ups, perks, crosshair notifications, and more.

My responsibility was the entire UI logic. I did not create the textures myself; I took the provided assets and built them into a working JsonUI system. Motion and feedback matter a lot here, so [watch the showcase video](#showcase-video) for the systems in action.

The project is still in active development, so textures, icons, and design may change or be adjusted over time.

Similar HUD-focused commission work: [Mineville UI](/projects/mineville_ui).