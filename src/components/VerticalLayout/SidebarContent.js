import React, { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "../../components/Common/withRouter";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboards")}</span>
              </Link>
            </li>

            <li>
              <Link to="/manage-sub-admin-users">
                <i className="bx bx-user-circle"></i>
                <span>{props.t("Manage Sub Admin Users")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i class="bx bx-cog"></i>
                <span>{props.t("Manage Master")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/manage-master/display-name">
                    - {props.t("Display Name")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-master/certificate">
                    - {props.t("Certificate")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-master/brand">- {props.t("Brand")}</Link>
                </li>
                <li>
                  <Link to="/manage-master/categories">
                    - {props.t("Categories")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-master/sub-categories">
                    - {props.t("Sub Categories")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-master/sub-sub-categories">
                    - {props.t("Sub Sub-Categories")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/media-upload">
                <i class="bx bx-image-add"></i>
                <span>{props.t("Media Gallery")}</span>
              </Link>
            </li>

            <li>
              <Link to="/manage-products">
                <i class="bx bx-basket"></i>
                <span>{props.t("Manage Products")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i class="bx bx-store-alt"></i>
                <span>{props.t("Manage Inventory")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/manage-inventory/display">
                    - {props.t("Display")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-inventory/reserved">
                    - {props.t("Reserved")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-inventory/sales">- {props.t("Sales")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i class="bx bx-group"></i>
                <span>{props.t("Manage Customers")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/manage-customers/individual">
                    - {props.t("Individual")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-customers/corporate">
                    - {props.t("Corporate")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i class="bx bx-list-ul"></i>
                <span>{props.t("Manage Requests")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#" className="has-arrow ">
                    <span>{props.t("Cart")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/manage-request/cart/individual-customers">
                        - {props.t("Individual Customers")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/manage-request/cart/corporate-customers">
                        - {props.t("Corporate Customers")}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/manage-request/quote">- {props.t("Quote")}</Link>
                </li>
                <li>
                  <Link to="/manage-request/bom">
                    - {props.t("BOM - (Bill of Materials)")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-request/new-product">
                    - {props.t("New Product")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-request/contact">
                    - {props.t("Contact")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/manage-ticket">
                <i class="bx bx-barcode"></i>
                <span>{props.t("Manage Ticket")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i class="bx bx-image"></i>
                <span>{props.t("Manage Contents")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/manage-contents/blogs">- {props.t("Blogs")}</Link>
                </li>
                <li>
                  <Link to="/manage-contents/banner">
                    - {props.t("Banner")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-contents/legal">- {props.t("Legal")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bxs-detail" />
                <span>{props.t("Manage Orders")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/manage-orders/corporate-customer">
                    - {props.t("Corporate")}
                  </Link>
                </li>
                <li>
                  <Link to="/manage-orders/individual-customer">
                    - {props.t("Individual")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/generate-reports">
                <i class="bx bxs-report"></i>
                <span>{props.t("Generate Reports")}</span>
              </Link>
            </li>

            <li>
              <Link to="/settings">
                <i class="bx bx-cog"></i>
                <span>{props.t("Settings")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
