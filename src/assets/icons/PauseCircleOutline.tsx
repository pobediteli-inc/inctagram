import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgPauseCircleOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <g fill="currentColor" clipPath="url(#pause-circle-outline_svg__a)">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20" />
      <path d="M15 8a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1M9 8a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1" />
    </g>
    <defs>
      <clipPath id="pause-circle-outline_svg__a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgPauseCircleOutline);
const Memo = memo(ForwardRef);
export default Memo;
