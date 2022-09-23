import { useState } from "react";
import FieldDefination from "@/components/Field/FieldDefination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faBars,
  faEllipsis,
  faUser,
  faBell,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";

import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import EventManagement from "@/components/Event/EventManagement";

const DashboardLayout = () => {
  const [DashboardIcon, setDashboardIcon] = useState<IconDefinition>(faBars);
  const [SidebarStyle, setSidebarStyle] = useState<string>(
    "col-2 d-flex flex-column sidebarTransition sidebar text-white"
  );
  const [MidContainerStyle, setMidContainerStyle] = useState<string>(
    "col-10 d-flex flex-column midContainer "
  );
  const [logostate, setlogostate] = useState<string>("open");
  const [IconAwesomeStyle, setIconAwesomeStyle] = useState<string>("iconawsome");
  function changeIconHandler() {
    if (DashboardIcon === faBars) {
      setDashboardIcon(faEllipsis);
      setSidebarStyle("col-1 d-flex flex-column  sidebarTransition sidebar text-white");
      setMidContainerStyle("col-11 d-flex flex-column midContainerTransition midContainer");
      setIconAwesomeStyle("iconawsome");
      setlogostate("close");
    } else {
      setDashboardIcon(faBars);
      setSidebarStyle("col-2 d-flex flex-column sidebarTransition sidebar text-white");
      setMidContainerStyle("col-10 d-flex flex-column midContainerTransition midContainer");
      setIconAwesomeStyle("iconawsome");

      setlogostate("open");
    }
  }

  return (
    <div className="container-fluid h-100 m-0 p-0 ">
      <div className="row h-100">
        <div className={SidebarStyle}>
          <div id="DashLogo" className="text-center">
            {logostate}
          </div>
          <div className="">profile</div>
          <div className="">menus</div>
        </div>
        <div id="middleContainer" className={MidContainerStyle}>
          <div className="text-dark d-flex flex-row-reverse m-2 py-1 h-5  ">
            <div className="col-8 d-inline-flex flex-row-reverse   log  ">
              <div className=" mx-4 my-2 py-2">
                <FontAwesomeIcon
                  className="iconawesomeSimple "
                  onClick={changeIconHandler}
                  icon={faUser}
                />
              </div>
              <div className=" mx-4 my-2 py-2">
                <FontAwesomeIcon
                  className="iconawesomeSimple col-2"
                  onClick={changeIconHandler}
                  icon={faBell}
                />
              </div>
              <div className=" mx-4 my-2 py-2">
                <FontAwesomeIcon
                  className="iconawesomeSimple col-2"
                  onClick={changeIconHandler}
                  icon={faPuzzlePiece}
                />
              </div>
            </div>
            <div className="col-4 d-flex flex-row ">
              <div className="bg-white  roundImgBtnBorder my-2 py-1">
                <FontAwesomeIcon
                  className={IconAwesomeStyle}
                  onClick={changeIconHandler}
                  icon={DashboardIcon}
                />
              </div>
              <span className="py-1 herogreentitle">Dashboard</span>
            </div>
          </div>
          <div className="h100 text-dark text-center mt-5">
            {/* begining of Tabs*/}
            <br></br>
            <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3 " justify>
              <Tab eventKey="EVENTS" title="EVENTS">
                <EventManagement></EventManagement>
              </Tab>
              <Tab eventKey="MEMBERS" title="MEMBERS"></Tab>
              <Tab eventKey="TTC" title="TIME TABLE OF classES"></Tab>
            </Tabs>
            {/* end of Tabs */}
          </div>
          {/* end of first content div */}
          <div className="text-dark container ">
            {/* beginning of Accordin */}
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>TRAINERS</Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="bg-secondary">
                <Accordion.Header>FIELDS</Accordion.Header>
                <Accordion.Body>
                  <FieldDefination></FieldDefination>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>PRICING</Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* end of Accordin*/}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
