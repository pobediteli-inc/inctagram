import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgPerson = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <g fill="currentColor" clipPath="url(#person_svg__a)">
      <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M18 21a1 1 0 0 0 1-1 7 7 0 1 0-14 0 1 1 0 0 0 1 1z" />
    </g>
    <defs>
      <clipPath id="person_svg__a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgPerson);
const Memo = memo(ForwardRef);
export default Memo;
