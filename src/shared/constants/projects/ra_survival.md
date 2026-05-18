---
title: Ra Survival
extraButtons:
  - text: Radium YouTube
    href: https://www.youtube.com/@Radium-Ra-88
    external: true
credits:
  - role: UI system creator
    name: AxmBro
    href: /contact
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
      Here is a list of in-game screenshots with short description! There were
      already some elements, so here is only list that I created and added to
      this map.
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
          Is in bottom left corner. It shows current round number and has fancy
          change animation when switching rounds - to match three bell sounds,
          it flashes and changes color to dark red.
        imageSrc: ra6
      - title: Gun display
        description: >-
          Is in bottom right corner. It shows current gun icon, name and ammo.
          It has fancy slide animation when switching guns.
        imageSrc: ra3
      - title: Low ammo indicator
        description: >-
          When ammo is really low, color is changed to dark red and text appears
          under crosshair. Also with subtle entry animation!
        imageSrc: ra5
      - title: Power-Ups
        description: >-
          It's anoter UI part above hotbars. If player colects any power-up,
          then there are entry and exit animations on UI.
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
      Simple layout that update sinstantly without any reloads. By using some
      simple trick I managed to make it this way instead of using server forms
      :D
    items:
      - title: Custom Inventory Screen
        description: >-
          Separated by updatable elements. Everything you see there can be
          changed.
        imageSrc: ra22
---

Is minecraft map for Bedrock Edition created by Radium and inspired by Call of Duty Zombie mode. I was hired to implement UI for this map, which includes various elements such as hotbars, gun display, rounds, power-ups, perks, crosshair notifications and more.

My part here was to just add this entire logic. I didn't created any textures, but used provided and made them work with JsonUI system.

Generally this project is still in development and textures, icons, design and everything may be changed or slightly adjusted.
