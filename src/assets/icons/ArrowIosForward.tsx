import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgArrowIosForward = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#arrow-ios-forward_svg__a)">
      <path
        fill="currentColor"
        d="M10 19a1 1 0 0 1-.77-1.64L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19"
      />
    </g>
    <defs>
      <clipPath id="arrow-ios-forward_svg__a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgArrowIosForward);
const Memo = memo(ForwardRef);
export default Memo;
