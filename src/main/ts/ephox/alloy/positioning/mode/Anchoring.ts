import { Contracts } from '@ephox/katamari';
import { SugarElement, SugarRange } from 'ephox/alloy/alien/TypeDefinitions';
import { AlloyComponent } from 'ephox/alloy/api/component/ComponentApi';

import { Option } from '@ephox/katamari';
import { PositioningConfig } from 'ephox/alloy/behaviour/positioning/PositioningTypes';
import { Bounds } from 'ephox/alloy/alien/Boxes';
import { Bubble } from 'ephox/alloy/positioning/layout/Bubble';
import { AnchorLayout, AnchorBox } from 'ephox/alloy/positioning/layout/Layout';
import { OriginAdt } from 'ephox/alloy/behaviour/positioning/PositionApis';
import { Anchor } from 'ephox/alloy/positioning/layout/Anchor';

// doPlace(component, origin, anchoring, posConfig, placee);
export type AnchorPlacement =
  (comp: AlloyComponent, origin: OriginAdt, anchoring: Anchoring, posConfig: PositioningConfig, placee: AlloyComponent) => void;

export interface CommonAnchorSpec {

}

export type AnchorSpec = SelectionAnchorSpec | HotspotAnchorSpec | SubmenuAnchorSpec | MakeshiftAnchorSpec;

export interface AnchorDetail<D> {
  placement: () => (comp: AlloyComponent, posInfo: PositioningConfig, anchor: D, origin: OriginAdt) => Option<Anchoring>;
}

export type MaxHeightFunction =  (elem: SugarElement, available: number) => void;
export interface AnchorOverrides {
  maxHeightFunction?: MaxHeightFunction
}

export interface SelectionAnchorSpec extends CommonAnchorSpec {
  getSelection?: () => SugarRange;
  root: SugarElement;
  bubble?: Bubble;
  overrides?: AnchorOverrides;
  showAbove?: boolean;
}

export interface SelectionAnchor extends AnchorDetail<SelectionAnchor> {
  getSelection: () => Option<() => SugarRange>;
  root: () => SugarElement;
  bubble: () => Option<Bubble>;
  overrides: () => AnchorOverrides;
  showAbove: () => boolean;
}

export interface HotspotAnchorSpec extends CommonAnchorSpec {
  hotspot: AlloyComponent;
  layouts?: {
    onLtr: (elem: SugarElement) => AnchorLayout[];
    onRtl: (elem: SugarElement) => AnchorLayout[];
  }
}

export interface HotspotAnchor extends AnchorDetail<HotspotAnchor> {
  hotspot: () => AlloyComponent;
  layouts: () => {
    onLtr: () => (elem: SugarElement) => AnchorLayout[];
    onRtl: () => (elem: SugarElement) => AnchorLayout[];
  }
}

export interface SubmenuAnchorSpec extends CommonAnchorSpec {
  item: AlloyComponent;
  layouts?: {
    onLtr: (elem: SugarElement) => AnchorLayout[];
    onRtl: (elem: SugarElement) => AnchorLayout[];
  };
}

export interface SubmenuAnchor extends AnchorDetail<SubmenuAnchor> {
  item: () => AlloyComponent;
  layouts: () => {
    onLtr: () => (elem: SugarElement) => AnchorLayout[];
    onRtl: () => (elem: SugarElement) => AnchorLayout[];
  };
}



export interface MakeshiftAnchorSpec extends CommonAnchorSpec {
  x: number;
  y: number;
  height?: number;
  width?: number;
  bubble?: Bubble;
  layouts?: {
    onLtr: (elem: SugarElement) => AnchorLayout[];
    onRtl: (elem: SugarElement) => AnchorLayout[];
  }
}

export interface MakeshiftAnchor extends AnchorDetail<MakeshiftAnchor> {
  x: () => number;
  y: () => number;
  height?: () => number;
  width?: () => number;
  bubble?: () => Bubble;
  layouts?: () => Option<{
    onLtr: () => (elem: SugarElement) => AnchorLayout[];
    onRtl: () => (elem: SugarElement) => AnchorLayout[];
  }>
}

export interface Anchoring {
  anchorBox: () => AnchorBox;
  bubble: () => Bubble;
  overrides: () => AnchorOverrides;
  layouts: () => AnchorLayout[];
  placer: () => Option<AnchorPlacement>
}

const nu: (spec) => Anchoring = Contracts.exactly([
  'anchorBox',
  'bubble',
  'overrides',
  'layouts',
  'placer'
])

export {
  nu
}