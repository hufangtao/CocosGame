import AccModule from "../component/page/login/AccModule";
import HomeModule from "../component/page/home/HomeModule";
import PlayModule from "../component/game/PlayMoudle";

export let Acc: AccModule;
export let Home: HomeModule;
export let Play: PlayModule;

export function create() {
  Acc  = new AccModule();
  Home = new HomeModule();
  Play = new PlayModule();
}
