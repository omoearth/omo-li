import {runWithDrive} from "../../../../../libs/o-fission/initFission";
import {UnpublishOfferContext} from "../unpublishOffer";

export const unpublishOfferService = async (context: UnpublishOfferContext) =>
{
  await runWithDrive(async drive => {
    await drive.offers.unpublishOffer(context.data.offerName.value);
  });
}
