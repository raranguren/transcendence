# FT_TRANSCENDANCE
Lucy in the Sky with JavaScript

## Model

```mermaid
---
config:
  class:
    hideEmptyMembersBox: true
---
classDiagram
direction TB
    class Tournament {
    }
    class Game {
    }
    class Player {
    }
    class PlayerStub {
    }

    Tournament o-- Game
    Tournament o-- PlayerStub
    PlayerStub --* Player

```