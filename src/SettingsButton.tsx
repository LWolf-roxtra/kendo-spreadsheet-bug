import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Component } from "react";
import { kendoJQuery, loadKendoLibs } from "./scriptloader";

interface IState {
  showEditor: boolean;
  kendoLoaded: boolean;
  modalOpen: boolean;
  spreadSheet: kendo.ui.Spreadsheet | undefined;
}

interface IProps {}

export default class SettingsButton extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      kendoLoaded: false,
      modalOpen: false,
      showEditor: false,
      spreadSheet: undefined,
    };
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState): void {
    this.buildOrRefreshSpreadsheet();
  }

  public async componentDidMount(): Promise<void> {
    await loadKendoLibs();
    this.setState({ kendoLoaded: true });
    this.buildOrRefreshSpreadsheet();
  }

  public componentWillUnmount(): void {
    this.setState({ spreadSheet: undefined });
  }

  private buildOrRefreshSpreadsheet(): void {
    const container = document.getElementById("spreadsheet-container-id");
    if (container) {
      if (
        this.state.showEditor &&
        !this.state.spreadSheet &&
        this.state.kendoLoaded
      ) {
        const spreadSheet: HTMLDivElement = document.createElement("div");
        spreadSheet.id = "instance-spreadsheet";
        spreadSheet.style.width = "100%";
        spreadSheet.style.height = "100%";
        container.appendChild(spreadSheet);
        const kendoSpreadSheet = kendoJQuery("#instance-spreadsheet")
          .kendoSpreadsheet({
            select: (e) => {
              kendoJQuery("#instance-spreadsheet")
                .find(".k-selection-wrapper")
                .show();
            },
            toolbar: {
              home: [
                "open",
                [
                  {
                    type: "button",
                    text: "Als Excel Speichern",
                    showText: "overflow",
                    icon: "k-i-download",
                    click: () => {
                      kendoSpreadSheet?.saveAsExcel();
                    },
                  },
                ],
                ["cut", "copy", "paste"],
                ["bold", "italic", "underline"],
                "hyperlink",
                "insertComment",
                "insertImage",
                "backgroundColor",
                "textColor",
                "borders",
                "fontSize",
                "fontFamily",
                "alignment",
                "textWrap",
                ["formatDecreaseDecimal", "formatIncreaseDecimal"],
                "format",
                "merge",
                "freeze",
                "filter",
                [
                  {
                    type: "button",
                    text: "Markierte Zellen sperren",
                    showText: "overflow",
                    icon: "k-i-lock",
                    click: () => {
                      const range = kendoSpreadSheet?.activeSheet().selection();
                      range?.enable(false);
                    },
                  },
                  {
                    type: "button",
                    text: "Markierte Zellen entsperren",
                    showText: "overflow",
                    icon: "k-i-unlock",
                    click: () => {
                      const range = kendoSpreadSheet?.activeSheet().selection();
                      range?.enable(true);
                    },
                  },
                ],
              ],
            },
            sheetsbar: false,
            useCultureDecimals: true,
          })
          .data("kendoSpreadsheet");
      }
    }
  }

  public render(): React.JSX.Element {
    const spreadsheetEditor: React.JSX.Element = (
      <Modal
        fullscreen
        show={this.state.showEditor}
        onHide={() => this.handleEditorClose()}
      >
        <Modal.Header>Spreadsheet Editor</Modal.Header>
        <Modal.Body>
          <div
            id="spreadsheet-container-id"
            style={{ width: "100%", height: "100%" }}
          ></div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={this.onEditorOkClicked}
            id="spreadsheet-editor-ok"
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <>
        <Button />
        <Modal show size="lg">
          <Modal.Header>ABC</Modal.Header>
          <Modal.Body>
            <div
              style={{
                padding: "10px",
                margin: "10px",
                border: "2px solid lightgrey",
                borderRadius: "5px",
              }}
            >
              <Container>
                <Row>
                  <Col xl={4} style={{ display: "flex" }}>
                    <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                      <span>Vorgabewert</span>
                    </div>
                  </Col>
                  <Col xl={8} style={{ display: "flex" }}>
                    <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                      <Button
                        variant="secondary"
                        onClick={this.openEditor}
                        id="snSpreadSheetSettingsOpenEditor"
                      >
                        <span>Editor öffnen</span>
                      </Button>
                      {spreadsheetEditor}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col style={{ display: "flex" }}>
                    <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                      {/* <Checkbox
                            id="snSpreadSheetSettingsRestrictedCheckbox"
                            onChange={(d): void =>
                              this.setState({ restricted: d.value })
                            }
                            label={tlFrontend("Direkt ausfüllen")}
                            checked={this.state.restricted == true}
                          /> */}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" id="snSpreadSheetSettingsOk">
              <span>OK</span>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  private openEditor = (): void => {
    // this.setState({ showEditor: true });
    this.setState({ showEditor: true });
  };

  private onEditorOkClicked = (): void => {
    this.handleEditorClose();
  };

  private handleEditorClose(): void {
    this.setState({ showEditor: false, spreadSheet: undefined });
  }
}
