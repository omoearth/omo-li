import { faCoins, faUserCircle, faPiggyBank, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { RunProcess } from "src/libs/o-events/runProcess";
import { setTrust, SetTrustContext } from "../processes/setTrust/setTrust";
import { transferXDai } from "../processes/transferXDai/transferXDai";
import { requestUbi } from "../processes/requestUbi/requestUbi";
import { QuickAction } from "../../../libs/o-os/types/quickAction";

export const safeDefaultActions: QuickAction[] = [
  {
    type: "route",
    pos: "1",
    mapping: {
      design: {
        icon: faPiggyBank
      },
      data: {
        label: "Safe"
      }
    },
    route: "#/safe/transactions"
  }, {
    type: "route",
    pos: "2",
    mapping: {
      design: {
        icon: faCoins,
      },
      data: {
        label: "Tokens"
      }
    },
    route: "#/safe/tokens"
  }, {
    type: "route",
    pos: "3",
    mapping: {
      design: {
        icon: faUserFriends,
      },
      data: {
        label: "Friends",
      }
    },
    route: "#/safe/friends"
  }, {
    type: "route",
    pos: "4",
    mapping: {
      design: {
        icon: faUserCircle,
      },
      data: {
        label: "Home",
      }
    },
    route: "#/omo/dapps"
  }
];

export const safeOverflowActions: QuickAction[] = [
  {
    type: "trigger",
    pos: "overflow",
    mapping: {
      design: {
        icon: faCoins
      },
      data: {
        label: "Get UBI"
      }
    },
    event: () => new RunProcess(requestUbi)
  },
  {
    type: "trigger",
    pos: "overflow",
    mapping: {
      design: {
        icon: faCoins
      },
      data: {
        label: "Invite Omo Sapien"
      }
    },
    event: () => new RunProcess(transferXDai)
  },
  {
    type: "trigger",
    pos: "overflow",
    mapping: {
      design: {
        icon: faCoins,
      },
      data: {
        label: "Trust friend",
      }
    },
    event: () => new RunProcess(setTrust, (context: SetTrustContext) => {
      return context;
    })
  },
  // {
  //     type: "trigger",
  //     pos: "overflow",
  //     mapping: {
  //         design: {
  //             icon: faCoins
  //         },
  //         data: {
  //             label: "Send Money"
  //         }
  //     },
  //     event: () => new RunProcess(transferCircles)
  // }, {
  //     type: "trigger",
  //     pos: "overflow",
  //     mapping: {
  //         design: {
  //             icon: faCoins
  //         },
  //         data: {
  //             label: "Receive Money"
  //         }
  //     },
  // }
];
