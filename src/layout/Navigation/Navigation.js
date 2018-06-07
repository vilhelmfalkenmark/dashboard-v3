import React from "react";
import { withRouter } from "react-router";
import Button from "components/Button";
import routes from "router/routes";
import packageJSON from "../../../package.json";

import WithCss from "hocs/WithCss";

import s from "./Navigation.css";

const Navigation = () => (
  <header className={s({ container: true })}>
    <nav className={s({ navigation: true })}>
      <ul className={s({ list: true })}>
        {routes.map((routeGroup, index) => (
          <li className={s({ routeGroup: true })} key={index}>
            <p className={s({ routeGroupTitle: true })}>{routeGroup.title}</p>
            <ul>
              {routeGroup.routes.map(route => (
                <li key={route.key} className={s({ navItem: true })}>
                  <Button
                    navLink={{
                      exact: true,
                      slug: route.slug
                    }}
                    className={s({ link: true })}
                    textClassName={s({ linkText: true })}
                    navLinkActiveClassName={s({ link_isActive: true })}
                    iconClassName={s({ icon: true })}
                    text={route.navTitle}
                    iconPositionLeft
                    icon={route.icon}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
    <span className={s({ version: true })}>{`Version ${
      packageJSON.version
    }`}</span>
  </header>
);

export default withRouter(WithCss(Navigation, s));
