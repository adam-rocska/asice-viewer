import {useEventListener} from "usehooks-ts";
import useBooleanState from "./use-boolean-state";
import {RefObject} from "react";

function useEventState<K extends keyof MediaQueryListEventMap>(enableOn: K, disableOn: K, element: RefObject<MediaQueryList>): boolean;
function useEventState<K extends keyof WindowEventMap>(enableOn: K, disableOn: K, element?: undefined): boolean;
function useEventState<K extends keyof HTMLElementEventMap & keyof SVGElementEventMap, T extends Element = K extends keyof HTMLElementEventMap ? HTMLDivElement : SVGElement>(enableOn: K, disableOn: K, element: RefObject<T>): boolean;
function useEventState<K extends keyof DocumentEventMap>(enableOn: K, disableOn: K, element: RefObject<Document>): boolean;
function useEventState(enableOn: any, disableOn: any, element: any): boolean {
  const state = useBooleanState(false);
  useEventListener(enableOn, state.set, element);
  useEventListener(disableOn, state.unset, element);
  return state.isEnabled;
}

export default useEventState;