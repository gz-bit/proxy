import { component$, useStylesScoped$ } from "@builder.io/qwik";
import ImgCommi from './commi.png?jsx'

import styles from './logo.css?inline';


export const Logo = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="flex justify-start items-center">
      <div class="w-12 h-12 mr-2">
        <ImgCommi />
        {/* <img src={"./commi.png"} width="12" height="12" alt="Code Raiders Logo" /> */}
      </div>
      <div>
        <div class="text-lg logo-title text-gray-800">Commi</div>
        <div class="-mt-2 text-[10pt] logo-subtitle text-gray-500 italic">the sheep</div>
      </div>
    </div>
  );
});
