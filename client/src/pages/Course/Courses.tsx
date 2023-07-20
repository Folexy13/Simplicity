import React, { useContext, useState } from "react";
import "./styles.scss";
import {
  ArrayComponent,
  Card,
  Layout,
} from "../../shared/components";
import { AllCategories } from "../../shared/constants";
import AppContext from "../../shared/context";
const Courses: React.FC = () => {
  const {
    CategoryBYTitle,
    CategoryByDuration,
    CategoryByCertificate,
    CategoryByLiveSession,
    CategoryByCensus,
  } = AllCategories;
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  let { categoryCount, setCategoriesCount } = useContext(AppContext);

 
  return (
    <Layout>
      <div className="courses">
        <div className={`input-container ${isFocused ? "focused" : ""}`}>
          <input
            className=""
            type="search"
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <label className={inputValue ? "shrink" : ""}>
            Start Learning Today...
          </label>
        </div>
        <div className="flex">
          <div className="category">
            {categoryCount > 0 && (
              <p
                onClick={() => setCategoriesCount(0)}
                style={{ cursor: "pointer" }}
              >
                Clear Filters({categoryCount < 7 ? categoryCount : "6+"}) x
              </p>
            )}

            <ArrayComponent array={CategoryBYTitle} length={5} title="Title" />
            <ArrayComponent
              array={CategoryByDuration}
              length={5}
              title="Duration"
            />
            <ArrayComponent
              array={CategoryByLiveSession}
              length={5}
              title="Live Session"
            />
            <ArrayComponent
              array={CategoryByCertificate}
              length={5}
              title="Certificate"
            />
            <ArrayComponent
              array={CategoryByCensus}
              length={5}
              title="Census"
            />
          </div>
          <div className="course_section">
            {Array(10)
              .fill(undefined)
              .map(() => {
                return (
                  <Card
                    type="courses"
                    title="Web Development"
                    instructor="Aluko O.F."
                    image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQcAAADACAMAAAA+71YtAAAA/FBMVEUOMEz////98vRWxM8AKUejcnUsLSw8g3b1koz0gkXJbDh2cLLvW3IAJESsra7/+vvVy3Dm5+gpKCa4uLnExMUqLS9YZXdHpK0hIiBHwc2cnaHT09dBQUKlzTkxQ1oAFTo/bXKSlpgkPlZzf4wAHT99fn2EiZCfam5icH9DVGrh3uPz59dNXnDSx2PzeTOHY2sAACzXxMUUFRTJ5+pNQ1chU2L/h0T6zb/4up6nXz3EqKmOVE3j1te7mpysgoSR1t12Rk5nU2GeySBoY6XFfHI2gZE1dm/3qqTGYiTtSWSut8jIUWhXREialsUhOFkWdWXc67rke0TqkpH1lGXeOcHPAAAUI0lEQVR4nO2di3+UurbHSV1q290wB+HSXegFBzgUZrh2etta+1Dbs+urevTo/v//l5PwDEyAMMPM4Ed/Ks4LJvmy1spKAhlJ+q3f+q3f+q3fGr4AYwAg/zZdkI0KO8/fP6V6fy79uiTASSAker7p4mxK+PxpWee/pEng90+r+hVBwDyGXxEEVJ0ikbPpcq1dXAxP3+NNl2u9gudM5b+xnrHpkq1XwBrBKVLQ+Nc0CCY6fFMevn17moP4pSJlyS0Q9Yvx6a/oGKVGU/lGQ4Ty7RdsOjEbJRHZPDw8dEohhg7r69fwq8DHSrnkA5IfTpXs2fPWKgJYX26/HMJQ+6hf9T9S6W0fZf1COX16aj7kT9vsAQ4vd15S7exeD5LEX38waiHBcEAKmz60xUk43H25k+nlzvXgQHz9o6JG9yiyaqQ8LavxW+C6oBCT+N5rJZZXWMXQAkLKYmQVQ2MeBZdlDFT91mNJzVlDG4gsUI4rGBrDQ9UaYn0fkmvwMPzxR9Me/O5mczp5yMGws7M7HBA6n0NTsOSMwrRFSfjOw7Dz8stQQHC9os0guCCeN0QH+FKYw4sXL+J/wzKI1Bz+zSh5JWzcbR5Dc5DczSnsXGwhhEYXf8ckXh72W52FFWcOf5kmymWayWvNZ6pqEc0pFOS2sJ1/z6sYxOVADCI+939N0ENWvAeUcGh0jOqA9fuWTDJxixd/X2yj0atEU7Q9IMdIw8OEmIFCKUyIYQhxID2F8/c5hZYBmKTRfPGKGAHxiERTdPFiOE3n18wekPJAYVCzSDm09rkAS875+bnT3lNIkwdU5pA4xtA4mEgxH0bUP0Q5iKvgML1Ao9j9RmiaNBkD49A1PnQS3GZ+gaavttgwORS/SLPJSY4hby/65JBmkyROEmPY3pki9PfQEoikzv8uMKDRQ2IjQrvjsdgQVNZuXhAC8TZLKIfS++Z0NkXyqFye0KfgMq33RYJjO/WKnZfWEmXvVYvk1YXAFTufWV79Yqf8/1DcorafJWgOUiT2sSKxLvezhpJWSzUGIRYduoiLYShZNRW3xym6MydOYsyrHNvjzDEMxyuoOCDEd2bjJMYkv3Z8g8aM+DGrJIcYMAapMlzdySnYOAlj2ZCwrMqq71my7FZBfNkpkRiUU6QqtZ6iITLZM3+EXUrAUWWiGfmnhpV6Amk9cxIvvw9mKKqkMLWJvxbuVmCfVN6HgoM+V1GQrnfjiZzvl8OksLDAL+pDfEG2sE62Id0avM44ndCzpMFO6yVapHRsnCTxwfEoAQuHxDR+1qtCIJq35ELY457fwh4wdQg5on6hWmSr1oAAf+gXlDm1BcSSZcg+z2Dy/gEElEAQw5D9cUyj7mAVATfj2JzqOIDtq/FplnWvWuK8rnhMbSCGQXnET7jVg6DyXDeMcEg+VOcX4Btp7WR5rOPKe9ku2DeI3OSTqk6f8DlIlXYZAj8aB4MCwS1MfKJzVVvDIk6SDBLbup/I8jA/v+YojPzAGFDMqLEHLJdUjn5suxk/x4mavsYt6kwDDujjwNAF++9rET8+YENlVTH2Bc5jAQmiAAOErhHo4wE5Rl2cdFhVzlv38STGHrBPQm9oOHpk1cSSfgVCCVxz/lCzzwL2XKADl0Rg3aKlm+uL9J5ygnR2d3x8fHfWemR+nGyW2PhkSYzVgWHI8hx98RKLC86OHxMd0c1x86WLoHc3zmqcFNmFjZOhYahGmWWpxFU3XFjxMXPd9e6FS8VJYk6GP1ajUqnKJT7uo8Rw9rii46aPWwsMojcPVmDaMlY2nltyDBzpzNd2LLGY5g9K1PD5MD4x8QkoNi1f0Rgn8ViKXM/AekA2Adl4gY5LKVPg66V0q2OJxeQkxzlK1WpoEElWCHq8AcsCkeajOU7GLtB0lEqz4HAwLO0akHja0QlCIwXdoNdtMSJHEEIAIXnU3hjgMcTGDvmmpI6BF455HJaNaqmNHd2cxLq54tsZJmc+K0d544k0Bjg29rEXRJLvueWQ1xI9qsr8+KhQD54BabWPTo4e0z9vrrh4ccBpwbuoFAYrGUi31iQ3YGV0s7V1gybK6PXynmHlHE6IU9ygq4zDY/ao4Iy9qCa5h26nk8ipHKlbtmnlBR5dKTdX6ORm6/V8iTsK7nIOVzf0z+ucA9tuhbIcytUR9uzN7klzBWi3bPMuK/CbN29en8TblMMSs+J5zJm3h7PiU5bs+rJek0+D3flLyx4G1bkcoRJTR3598vjxzdFRxuFscYNgOLxO/uQc7vIPYTnE46imsJ6rWt2+3/NVNiJ4rtzlAAyHo5NrdPLmKudw17537VEf5xyq9sByCMZ14+vYDzy1U6DDRgQqZp7qoC5Q4pSDwnBYIlCW7OGK/OHZg2SNa00XGzaEnSIElm3MtJzkADjo0BSxfnF19eb65HFhD71wSJriN0V8YI5aP4i4oD0A+xR3sgfGL45onCRlzuJDl2JUjlq0F0k2UnAQjL6ea9Q0JLV7+KXOg+0bnQJM3l6cbJ1Mbk5GRbu5zFVUZ7UcRMsmPOJct0fHA2T5w83N6ERRTtDJpIf8oRR2Sn7BDTr/s241lPjxm1xLh0mpMLObmxuSSt1MavoXGYYn6xQfBK/XTbXc5AZkHBBCpM/Z2N9cK4QERH2Jq1q24535G+23tYw/kJI9+3N9ekZANJS4omWH5jqMRxEM/1yjDp/xOXQdQVscRM0nnzz5fw2tT//8k8+BV+I+Zj6hYmi1g55D4UBKfCxW4q4kzorjHtdnNYPhIFzi7iQsOjl0fHzWNGA6IA50jQiBEi+EAtrmC4fEQazEi6ntkEPjsKLFU6BtAH2Og6JpykTTTPp/8opWfEDT8lcZqfw6y/OfbOeAuVdfLq3WKZk5DpPImmjYVidWlNZjPMvf9Ge+b1nVyulcDLbhzYNot4cF5tFF1N0vFAchCRCyaC3imtgorxBF4gYoe6d4gz4alQ4zQ5aJqmqPD0tNJdSq1cw48cFGmuuqCJMaS2FIXsBRNJMLDqSGSLUjUJCCdfKGTp4rXmhZWDFmYThL2cCM4y/tHFZ0fUybmXE4uKqvaa7mIpV4gOGTypsJgJQD3ZC/poTUANEb5W2EQlJnIA91DQXJ8WzNMpVZ1SLa/WI1l0u1zkRwOGgB8QzsasiwgsAdJ5WXJjkHAsD0XPIWCR14lnCwiRFQALqZctAsYiPunEW028NqrhuDqDsHNCPOENIzTqKESd6dacgs7EEB4iPU+GWkGkiNYg6RQdyF5aCQT/iz6pEzDg0XGK7o8rmGyf548IzHgVQKGaR+SLaBREtHcrGdGDgpPlAXIDYBoCFVAs9EoU0Cp+WFkYZ8z0ZuEiBUGwK3xi9sw5BrHHZF8aE+TkIk02m9HvMoTvMwp5gDuLodGulkMLuh/62mvaDD8/TS1WxSH/INlm1b9frioMxcKxD4XMwBGxJJUHTs40jHLtYj8kgPwcVBKHWaEBQXRK43xlFANnp2eY7nxlcsGLYt4/7sweRkjzUcJEmNZw6BvZAkP0Gr0fzlWullLLbh+36PHMSUcoBoOIswelHobayfNRgKUloWHgffdQO/JujJgZD9t3EYnHgcFEeeaCBzK6JYE9E6uz87h7gFVOLU0SBvyqppqiRpUA1qIxHlIBs0j1IVg7ysyBOVpFQxNpW+bsqKTF7XFupfbEp8DvQlyUSyo5LOpTwzaZ2CQLPkhMPMH5NkyZhFaugiRceyLsk6Sb4sXyV7mZalYpMkUhyL2jSH2nnjeg6k2zSTNZNUODC1AE1mmqbOYg607yW7SWeD/DMMYh9I9pEmmZrs5Mm1LeYXwL0vciXCfu29pY1+MVPpwBQyg4CcZZsORsUcfHLqSVeT4UBRjJHqmOTzHTlgV17bfZ14PK7rf/M4TCTDlOmIgx8pJjm/pIdBN2NFjkiclAkiVYv74r7ikldcFxlB3JDYsmIQRwllFBhJd72VA7iqbKwoiZwT+bJo7s6XRDwONMMyks5S4NL/tTjiGcGY+INPHEJxA1pH0Gh1Tdc1zfgvAUdfUMlHVLKfwWkw5jgkN8OtpNJz9cUUOukQ8sxviTxK4Rl+i+Y50MUC5J7tAbAnnZ+fS17pchQ8pjflqobM69IuwcGxwuU5SBIpWu0gydezswXuh7PP9x8l2j+32cu20jsweWNTXTlsda56CwfQZZ8fvG4/78X6fN0JA84pUB2c5weH9N5rg3cV/TyHtwesEF0QjhVSS3e3mmj6f02atnIIuXYKt3uMPotjsN89KutdfnFwsnRLEPDMj8OhdBSUL4yXroOFlJIQ4fCPerVzkCTuysCf98oSvYDQ3n9U1X5mEWD5ruXxpw27c1ANVubyHDjFsvbmdCuEwataQwyisIgO8/5tHCYmK2V5DhzNYxCzCDg/4HB49K69PerOwVw5B6g6RSIBDphHgah9zwH4xZxuuRj2PrcO3kDFKxTl7VtBg1g2To765wB8DHt7ramEzZb84C39wtPkSevscXcO2ly72TOH2Bw+lROVmENrHsFGh4O3CjolKE7j11p/uGaB+KCxmvTP4XPKYfpjVOaw11KZ3C1OD6hDnKJHB6eo3THidnQBv5iwWixOeg3zz5Bx2Ps0rXBoAYhTDqT2RISDQv4m1dmv5+C5ri3IoZRPymNW2iL5pKcaajG3VN3spRy2Luge01HBoaXpxEkO9Tb9rphGGh9oLoWZSZJiY8uhzp3HmePQp5L5rLHlSbKV3ECsQ2jFG4lsHInkvHtsfNj69KPgcCvEgZjDKQ2S5MGj04OCg++5YbxxyMaxXM93QrIZe/z5rDkO2rhBGvrPv/6XFdov6ZTHwU84JPdQUw5BwiGim4LD9AMF8OlCmMO7zCtIH0mh20dZ4KR+kc1i0Uc4ntqkL9iqB9z5zTkOSpNQhcO/BDhInmyo0OoXJEBsffiUPhTyi3eZPSiPYnsoqtEQJy3ZkITig6k2yFzAHmicrC9XHid/EAaUw96eYJxM2808PjAcmtrN+FqMzXBoVMphure3vXfxg2x+XIi1m1kelbYXbFejjzyq0S+U/jmcVfOokWgelTWcbw+IY7D16CWv7j1OtmjxvHq1/SzFbNAK7KG2n9Vem5X2uxWtQavgsHi/O/eMkvYFbtsXiZNyg1YQJ6XFx2G4A1L7rUGSz4EdpqUcRk1hcrQSDl/nMdwKYWgcp+3GQTllReOk0SBqDyX1wmHxcVriGg47VLt/LmINvVwXNC1pbjx7MQ7lcftuMxje+bskoz54x87jrJpDF3W5/iGfx7ntREGK5/XAOXcq83otHP7cP1ifntfcv1kna4mFD1pUnsagHGqSjxWoM4eVCSAqXbu4Xg6PShyg+/oKfQlCmS41W+RXG+QAkeEHq7q+vkWOqvo++8sMcXxYG4aSX4BOO6zj3lbc7CBwVdf2IrW42ePJk2fnz9en8n3ulu4TEgKr+vUt7MemoBoMhyfP1qnSugcAWPJLbromQaCObdtlfpFg7etgMBwch8RJj3jHiu65aAIh00uEmFWR1moMsdj4QC/RwQTEujGk18YwF+Icrl/ZyYeInBE5XpRt/T8dAqXfp4AQjdYstJX3/8C2DFXGpBGT1+8YrioXrQWEo611Syk4ONijP5bhVVdwXgsI9udKNsqBnJKxF5K2i7bmGzAI5hrjjXKgi/17WFWBBMwN/LaQw66evVG/kFyLnBaX5FPu+lvOkjbMgVYe8s0GtQkOW50XfV29NmwPA9L6OZhD5ID9bolUTd26HKHjEp9rEpZ0cUUGf1LLDMSPITqAvHaBuGy5ZnaP/vqRoDZdXUF5VkNGg2v8YqQK+Dw58s8CgRiH6tcvVQx6XXwQaAMwOfKGfrucWCH9kbcOZ4FeyQa1S2d4cm2cbF0WD9wovi6tvch9Ow/gs6N7qmNHOHkHP7KdWg72pK4tHLX2D8ANbGjhAHB4fUl12+dqg8fbue7vREl4slE/FuDVJxtaq2N4htEy7AS3u7n6+hlfONsu6V50R9uvrRG4DUlXe4BoOHJ89MPdki5FS9wkfLxdlaip1Q+i14cH4hgC2VHj8DxrDKmWj6ocDASE0K4N6xbVhwfCoX2ZwMYVkTgYlgdRdYpUQgZRv/AWOE19kfZeQ+OSXoccDLu7S8YI4GLYvl9izAdsG/zGPpmD7cU7UMDFsHu5FAg4Kur+4eJDN8/g/34gdidbtZ2sRGi0ZTauXwD1bWvJKz725Rm4qPkWQqOLwiBE8HKjmTcRkdIcJBpuPckZfPx4f0G3fRjEXV7x+EYOVGARcIyaBQptITUev2Hpwzw6XFzE11hdvMpALMGBcYvkZpjCM0Qusun801nCqm1a4Tqt9f10Si+r3ppOMw6Hi38dvi+iQ8UeevlNy/4Fl2mtv2d3MeUcbhcvMRMeqEGMmEB51H5U3P13VgVVHydzDrsph62cw3U/HEiA2CpzcNL1DTkbx0mXPlyR4jjJ3nmTPS7CZHJTGppe9MuhGh+OAFzLcTG9Swu7UhjQjY5diOJFECOgiyD2UGOuyMFDS4qSm9HiTSQ5dFPYw8dpUuLpj93lOUAeHz6k3sbGB96te5X1D1elkN6HFuB4ozuOnm5Yv7iflt1imfhQtBdZ1MkziA2NB5VKxzsTeRr18YJ4xnR6nydSS7QXRe8iu5h32iF/2IisIpl8RdKH+yKlXMY8cZXDlnhzsRkVjkGy6h9MYr1EeGBGoj5kSp/3Vu7e9WWXr+WOyracjAaaRVExBsFqiSgZy+JhWKbbvXrxMCzX7SaCOw6H4VqDND862YNXxIedG5ESHqjdkOZB9DJQC9J9CcPRoJ0iUTlGLNVUMMJnBYmjQa2TXCc4LEhc91hiLN0d3d8fHZ/9NPOrIH25vr68vj3seVr855pqj/XTFfi3fmto+i+zY6C5IuS1YQAAAABJRU5ErkJggg=="
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
