import React from "react";
import "./Pricing.scss";
import { Card, Layout } from "../../shared/components";
import { TiTick } from "react-icons/ti";
import {ImCross} from "react-icons/im"
import { Packages } from "../../shared/constants";


const Pricing: React.FC = () => {
  return (
    <Layout>
      <h1>Pricing </h1>
      <div className="pricing">
        {Packages
          .map((pkg:any,i:number) => {
            return (
              <Card key={i} title={pkg.title} price={pkg.price} titleColor={pkg.titleColor} width="500px">
               {pkg.content.map((details:any,j:any)=>{
                return (
                  <div className="flex" key={j}>
                    {details.icon === "accepted" ? (
                      <TiTick color="green" size={32} />
                    ) : (
                      <ImCross color="red"  />
                    )}
                    <span>{details.details}</span>
                  </div>
                );
               })}
              </Card>
            );
          })}
      </div>
    </Layout>
  );
};

export default Pricing;
