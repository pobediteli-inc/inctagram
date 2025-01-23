import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgCreditCardOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <g fill="currentColor" clipPath="url(#credit-card-outline_svg__a)">
      <path d="M19 5H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3M4 8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1H4zm16 8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5h16z" />
      <path d="M7 15h4a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2M15 15h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2" />
    </g>
    <defs>
      <clipPath id="credit-card-outline_svg__a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgCreditCardOutline);
const Memo = memo(ForwardRef);
export default Memo;
