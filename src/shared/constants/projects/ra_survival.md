---
title: Ra Survival
extraButtons:
  - text: Radium YouTube
    href: https://www.youtube.com/@Radium-Ra-88
    external: true
credits:
  - role: UI system creator
    name: Me - AxmBro
    href: https://github.com/AxmBro
  - role: Main creator
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
        description: With in-game items it gets more interesting!
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
      - title: Rounds element
        description: >-
          Sits in the bottom left corner, showing the current round number with
          a smooth change animation when switching rounds. To match the three
          bell sounds, it flashes and shifts color to dark red.
        imageSrc: ra6
      - title: Gun display
        description: >-
          Sits in the bottom right corner, showing the current gun icon, name,
          and ammo, with a smooth slide animation when switching guns.
        imageSrc: ra3
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
      - title: Crosshair notifications
        description: Extra element for quick message to user.
        imageSrc: ra12
      - title: Hurt Flash
        description: >-
          Whenever player receives damage and their health is not low, slightly
          red overlay appears.
        imageSrc: ra14
      - title: Electric Flash
        description: >-
          Is visible when player walks through electric trap, blue overlay
          appears with entry animation and disappears smoothly as well.
        imageSrc: ra16
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

A Minecraft Bedrock Edition map by Radium, inspired by Call of Duty's Zombies mode. I was commissioned to build the full UI, including hotbars, a gun display, round counters, power-ups, perks, crosshair notifications, and more.

My responsibility was the entire UI logic. I did not create the textures myself; I took the provided assets and built them into a working JsonUI system.

The project is still in active development, so textures, icons, and design may change or be adjusted over time.