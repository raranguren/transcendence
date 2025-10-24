# FT_TRANSCENDANCE
Lucy in the Sky with JavaScript

## Model

```mermaid
---
config:
  class:
    hideEmptyMembersBox: true
  layout: elk
---
classDiagram
direction TB
    class User {
    }
    class Player {
    }
    class Game {
    }
    class Tournament {
    }
    class GameState {
    }
    class Invitation {
    }
    class Challenge {
    }

    User *-- Player
    User o--> Player
    Player --* Game
    Tournament *-- Player
    Game *-- GameState
    Game --o Tournament
    Player o-- Invitation
    User o-- User : blocked
    Player o-- Challenge
```

