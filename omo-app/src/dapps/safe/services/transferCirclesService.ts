import { BN } from "ethereumjs-util";
import {TransferCirclesContext} from "../processes/circles/transferCircles";
import {tryGetDappState} from "../../../libs/o-os/loader";
import {FissionAuthState} from "../../fissionauth/manifest";
import {OmoSafeState} from "../manifest";
import {GnosisSafeProxy} from "../../../libs/o-circles-protocol/safe/gnosisSafeProxy";

function sendMessage(message) {
  // This wraps the message posting/response in a promise, which will resolve if the response doesn't
  // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
  // a convenient wrapper.
  return new Promise(function (resolve, reject) {
    var messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = function (event) {
      if (event.data.error) {
        reject(event.data.error);
      }
      else {
        resolve(event.data);
      }
    };

    // This sends the message data as well as transferring messageChannel.port2 to the service worker.
    // The service worker can then use the transferred port to reply via postMessage(), which
    // will in turn trigger the onmessage handler on messageChannel.port1.
    // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
    navigator.serviceWorker.controller.postMessage(message,
      [messageChannel.port2]);
  });
}


export const transferCirclesService = async (context: TransferCirclesContext) =>
{
  const web3 = context.environment.eth.web3;
  const safeState = tryGetDappState<OmoSafeState>("omo.safe:1");
  const ownerAddress = context.environment.eth.web3
    .eth
    .accounts
    .privateKeyToAccount(safeState.myKey.privateKey)
    .address;

  const gnosisSafeProxy = new GnosisSafeProxy(web3, ownerAddress, safeState.mySafeAddress);

  try {
    const circlesValueInWei = context.environment.eth.web3.utils
      .toWei(context.data.value.value.toString(), "ether");
    const oValueInWei = new BN(circlesValueInWei).div(new BN("3"));
    /*
    const pathResult = await sendMessage({
      call: "findPath",
      args: {
        from: context.environment.safe.address,
        to: context.data.recipient.value,
        value: wei
      }
    });

    window.o.logger.log(pathResult);
*/
    const tokenOwners = [safeState.mySafeAddress];
    const sources = [safeState.mySafeAddress];
    const destinations = [context.data.recipient.value];
    const values = [oValueInWei];
    /*
        (<any>pathResult).data.transfers.forEach(transfer =>
        {
          tokenOwners.push(transfer.tokenOwner);
          sources.push(transfer.from);
          destinations.push(transfer.to);
          values.push(transfer.value);
        });
    */
    const transferTroughResult = await context.environment.eth.contracts.hub.transferTrough(
      safeState.myKey.privateKey,
      gnosisSafeProxy,
      tokenOwners,
      sources,
      destinations,
      values
    );

    window.o.logger.log(transferTroughResult);
  } catch (e) {
    console.error(e);
    throw e;
  }
}