---
title: Zeqa UI
extraButtons:
  - text: Zeqa Website
    href: https://inpvp.net/
    external: true
credits:
  - role: UI Engineer
    name: AxmBro
    href: https://github.com/AxmBro
  - role: Client
    name: InPvP
    href: https://inpvp.net/
videos:
  - title: Full UI Showcase
    description: >-
      Full walkthrough of the Zeqa UI in motion - grids, forms, progression
      screens, and HUD. Most interfaces use smooth animations that still photos
      cannot show. Strongly recommended if you want the real feel of the pack.
    youtubeId: Nf5Z9dxRc_U
imageSections:
  - title: Server Forms & UI
    description: >-
      Custom JsonUI forms, menus, and HUD pieces built for high-traffic PvP on
      Zeqa. Most screens include animations and transitions that do not show in
      still shots - watch the showcase video above for the full experience.
    items:
      - title: Big Grid
        description: >-
          Default large grid with custom top tabs, smooth animations, and
          conditional icons such as New badges.
        imageSrc: zeqa_ui1
      - title: Big Grid Without Tabs
        description: >-
          Same large grid layout in a simpler mode - clean spacing, clear icons,
          and quick selection without category tabs.
        imageSrc: zeqa_ui2
      - title: 2x2 Grid
        description: >-
          Compact 2x2 grid with a featured full-width button, shine animation,
          and conditional labels like doubled XP.
        imageSrc: zeqa_ui3
      - title: Map Selector
        description: >-
          Clean map picker with background images and a simple centered title on
          each option.
        imageSrc: zeqa_ui4
      - title: Battle Pass
        description: >-
          Battle Pass UI with 100 levels split into free and premium tracks
          (premium on the right), plus a center progress bar with claim buttons
          attached to it.
        imageSrc: zeqa_ui5
      - title: Battle Pass Progression
        description: >-
          Progression-focused Battle Pass view - center progress, free pass
          controls, and Back / Next pagination at the bottom.
        imageSrc: zeqa_ui6
      - title: Default Form
        description: >-
          Simple action form with half-width buttons, server-side search, and
          body text pinned at the top.
        imageSrc: zeqa_ui7
      - title: Default Form Compact
        description: >-
          Same default form in a lighter layout - no scrolling and no search bar,
          built for short menus.
        imageSrc: zeqa_ui8
      - title: Levels
        description: >-
          Level progression UI based on in-game levels, with a center progress
          track and claim buttons similar to the Battle Pass pattern.
        imageSrc: zeqa_ui9
      - title: Levels Progression
        description: >-
          Levels view scrolled to the next unlockable reward. Body text and the
          top action stay fixed while only the claim list scrolls, with Back /
          Next at the bottom.
        imageSrc: zeqa_ui10
      - title: Profile
        description: >-
          Profile form with a player paper doll and customization options,
          split into two clear sections.
        imageSrc: zeqa_ui11
      - title: Cosmetics
        description: >-
          Cosmetics screen built on the profile layout - paper doll rotates 360
          degrees, with a search bar and cosmetics grid on the right.
        imageSrc: zeqa_ui12
      - title: Ranks
        description: >-
          Static ranks layout for quick comparison and short role descriptions
          on the server.
        imageSrc: zeqa_ui13
      - title: Rules
        description: Server rules presented in a custom static information layout.
        imageSrc: zeqa_ui14
      - title: List Form
        description: >-
          List UI inspired by the vanilla modal form, with action buttons, a
          Back button, and a client-side search bar.
        imageSrc: zeqa_ui15
      - title: Custom Modal Form
        description: >-
          Vanilla-style modal form rebuilt with custom textures for every button
          type.
        imageSrc: zeqa_ui16
      - title: Custom Modal Settings
        description: >-
          Custom modal form with extra option types and scrolling - used for
          settings-style menus.
        imageSrc: zeqa_ui17
      - title: Bundles Redeem
        description: >-
          Unused bundles redeem layout shaped around a progress flow, kept as a
          simple claim UI.
        imageSrc: zeqa_ui19
      - title: Rewards Grid
        description: >-
          Unused rewards grid form for showing claimed and available reward
          slots in a compact grid.
        imageSrc: zeqa_ui20
      - title: Bundles Browser
        description: >-
          Unused bundles browser in a map-form style, with custom tabs, body
          text, and a Back button.
        imageSrc: zeqa_ui21
      - title: Shared Server Forms
        description: >-
          Additional server forms from another InPvP pack (for example bundles,
          auction house, and rewards grid). Design differs from the main Zeqa
          set - the work here was integration and wiring, not a straight copy.
        imageSrc: zeqa_ui24
  - title: Other Modifications
    description: >-
      Extra pack work outside the main server form set - HUD, pause menu, and
      chat screen updates.
    items:
      - title: Custom Boss Bar
        description: >-
          Custom top-of-screen HUD element used instead of the default boss bar.
        imageSrc: zeqa_ui18
      - title: Pause Screen
        description: >-
          Pause menu updates - modified Store button in the main list and a
          Discord button in the top-left corner.
        imageSrc: zeqa_ui22
      - title: Quick Chat Commands
        description: >-
          Quick commands in the chat screen - an existing InPvP system adapted
          and wired into this pack.
        imageSrc: zeqa_ui23
---

Commissioned by [InPvP](https://inpvp.net/) for Zeqa, one of the largest Minecraft Bedrock PvP servers. I built a clean custom JsonUI layer where smooth animations and responsive server forms were the main focus, with a smaller set of HUD adjustments to match competitive gameplay.

Most of the scope covered optimized server forms, grid menus, progression screens, and polished transitions. I worked from client documentation, researched Bedrock UI behavior where needed, and iterated with the team through testing and revision until the final screens shipped.

Screenshots and video footage later on this page are a mix of production and development builds, so not every detail will match the live pack one-to-one - the systems shown are still real, shipped, and in use.

A large part of this work is motion: open states, transitions, and feedback across most forms. That does not come through in screenshots alone, so [watch the showcase video](#showcase-video) if you want to see how the UI actually plays.

Similar work for the same studio: [Mineville UI](/projects/mineville_ui).
