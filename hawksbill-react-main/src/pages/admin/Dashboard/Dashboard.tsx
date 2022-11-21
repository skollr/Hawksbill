import { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import {
  getRequestPercentage,
  getRequestStats,
} from "../../../helpers/helpers";
import { PropsInterface } from "../../../helpers/interfaces";

export const Dashboard: React.FC<PropsInterface> = (): JSX.Element => {
  useEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    const barRoot = am5.Root.new("xyChart");
    const donutRoot = am5.Root.new("donutChart");
    getRequestPercentage();
    getRequestStats(barRoot, donutRoot);
    return () => {
      barRoot.dispose();
      donutRoot.dispose();
    };
  }, []);
  return (
    <div className="main">
      <div className="main__content">
        <section className="container container--blocks">
          <div className="box-item box-item--row box-item--dashboard-linearbar">
            <h2 className="reusable__modal-header--title">
              Estadísticas de eventos
            </h2>
            <div className="linear">
              <div className="linear-bar">
                <span className="linear-bar__text linear-bar__text--percent">
                  ∞
                </span>
                <div className="linear-bar__container">
                  <div className="linear-bar__progress"></div>
                </div>
                <span className="linear-bar__text linear-bar__text--category">
                  Redes y Telecomunicaciones
                </span>
              </div>
              <div className="linear-bar">
                <span className="linear-bar__text linear-bar__text--percent">
                  ∞
                </span>
                <div className="linear-bar__container">
                  <div className="linear-bar__progress"></div>
                </div>
                <span className="linear-bar__text linear-bar__text--category">
                  Software
                </span>
              </div>
              <div className="linear-bar">
                <span className="linear-bar__text linear-bar__text--percent">
                  ∞
                </span>
                <div className="linear-bar__container">
                  <div className="linear-bar__progress"></div>
                </div>
                <span className="linear-bar__text linear-bar__text--category">
                  Operaciones
                </span>
              </div>
              <div className="linear-bar">
                <span className="linear-bar__text linear-bar__text--percent">
                  ∞
                </span>
                <div className="linear-bar__container">
                  <div className="linear-bar__progress"></div>
                </div>
                <span className="linear-bar__text linear-bar__text--category">
                  Hardware
                </span>
              </div>
            </div>
          </div>
          <div className="box-item box-item--row box-item--dashboard-charts">
            <div className="chart chart--xy" id="xyChart"></div>
            <div className="chart chart--donut" id="donutChart"></div>
          </div>
        </section>
      </div>
    </div>
  );
};
