import { useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Col, Nav, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faBars,
  faEllipsis,
  faUser,
  faBell,
  faPuzzlePiece,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import FieldDefination from "@/components/Field/FieldDefination";
import EventManagement from "@/components/Event/EventManagement";

const DashboardLayout = () => {
  type EventManagementHandler = React.ElementRef<typeof EventManagement>;
  const refEventManagement = useRef<EventManagementHandler>(null);

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
  function AddEventHandler() {
    refEventManagement.current?.PopAddModal();
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
          <div className="h100 text-center mt-3 mb-5 w-100">
            {/* begining of Tabs*/}
            <br></br>
            <Tab.Container id="tabs-example" defaultActiveKey="EVENTS">
              <Row className="w-100">
                <Col>
                  <Nav variant="pills" className="w-100 H2rem ">
                    <Nav.Item className="h-100 tabwaidth">
                      <Nav.Link
                        className="border rounded-4 shadow bg-info border-info w-100 h-100 py-3 "
                        eventKey="EVENTS"
                      >
                        <div className="row d-inline-flex w-100  ">
                          <div className="col-1 roundImgBtnBorderWhite">
                            <FontAwesomeIcon
                              className="iconawsomeWhite"
                              onClick={AddEventHandler}
                              icon={faPlus}
                            />
                          </div>
                          <div className="col-10 text-white py-2">
                            <h5>EVENTS</h5>
                          </div>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="h-100 tabwaidth ">
                      <Nav.Link
                        className="border rounded-4 shadow bg-warning border-warning w-100 h-100 py-3 mx-3"
                        eventKey="MEMBERS"
                      >
                        <div className="row d-inline-flex w-100  ">
                          <div className="col-1 roundImgBtnBorderWhite">
                            <FontAwesomeIcon
                              className="iconawsomeWhite"
                              onClick={AddEventHandler}
                              icon={faPlus}
                            />
                          </div>
                          <div className="col-10 text-white py-2">
                            <h5>MEMBERS</h5>
                          </div>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="h-100 tabwaidth  ">
                      <Nav.Link
                        className="border rounded-4 shadow bg-success border-success w-100 h-100 py-3 mx-3"
                        eventKey="TTC"
                      >
                        <div className="row d-inline-flex w-100  ">
                          <div className="col-1 roundImgBtnBorderWhite">
                            <FontAwesomeIcon
                              className="iconawsomeWhite"
                              onClick={AddEventHandler}
                              icon={faPlus}
                            />
                          </div>
                          <div className="col-10 text-white py-2">
                            <h5>TIME TABLE OF CLASSES</h5>
                          </div>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
              <Row className={" mx-3 border border-1   rounded-4 shadow colorizePurple my-1 py-2"}>
                <Col>
                  <Tab.Content>
                    <Tab.Pane eventKey="EVENTS">
                      <EventManagement ref={refEventManagement}></EventManagement>
                    </Tab.Pane>
                    <Tab.Pane eventKey="MEMBERS">jllklkllk</Tab.Pane>
                    <Tab.Pane eventKey="TTC">jllklkllk</Tab.Pane>
                    <Tab.Pane eventKey="4">jllklkllk</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
            {/* end of Tabs */}
          </div>
          <br></br>
          {/* end of first content div */}
          <div className="text-dark container ">
            {/* beginning of Accordin */}
            <Accordion defaultActiveKey="0" className="w-100 h-100 border rounded-5 colorizePurple">
              <Accordion.Item eventKey="0" className="">
                <Accordion.Header className="  px-0 py-0">
                  <div className="row d-inline-flex accordinwaidth bg-danger py-3 border-danger rounded-3 px-3 ">
                    <div className="col-6 text-white py-2">
                      <h5>TRAINERS</h5>
                    </div>
                    <div className="col-6 text-white py-2  justify-content-end d-flex">
                      <h5>10 ACTIVE TRAINERS</h5>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>jgdhjgdhjfghdfgdjfgfgg jhdfjgd fjhdf jdg jsgd</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="0" className="">
                <Accordion.Header className="  px-0 py-0">
                  <div className="row d-inline-flex accordinwaidth bg-primary py-3 border-primary rounded-3 px-3 ">
                    <div className="col-6 text-white py-2">
                      <h5>TRAINERS</h5>
                    </div>
                    <div className="col-6 text-white py-2  justify-content-end d-flex">
                      <h5>10 ACTIVE TRAINERS</h5>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>jgdhjgdhjfghdfgdjfgfgg jhdfjgd fjhdf jdg jsgd</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="bg-secondary">
                <Accordion.Header className="bg-warning w-100 h-100">FIELDS</Accordion.Header>
                <Accordion.Body>
                  <FieldDefination></FieldDefination>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>PRICING</Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
            </Accordion>
            rtrytyty
            {/* <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header className="bg-success">
                  {/* <CustomToggle eventKey="0">Click me!</CustomToggle> */}
            {/* <AccordionButton accessKey="0" contr>sdd</AccordionButton>
                </Card.Header>
                <Accordion.Collapse eventKey="0" className="bg-success">
                  <Card.Body className="colorizePurple">Hellom the body</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  {/* <CustomToggle eventKey="1">Click me!</CustomToggle> */}
            {/* <AccordionButton key="1">c</AccordionButton>

                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion> */}
            {/* end of Accordin*/}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
