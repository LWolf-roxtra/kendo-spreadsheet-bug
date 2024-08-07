let kendoLoaded = false;

export let kendoJQuery: JQueryStatic;

export async function loadKendoLibs(): Promise<JQueryStatic> {
  if (!kendoLoaded) {
    await loadScript("dist/kendo.js");

    require("@progress/kendo-ui/js/kendo.core");
    require("@progress/kendo-ui/js/kendo.data");
    require("@progress/kendo-ui/js/kendo.binder");
    require("@progress/kendo-ui/js/kendo.color");
    require("@progress/kendo-ui/js/kendo.popup");
    require("@progress/kendo-ui/js/kendo.userevents");
    require("@progress/kendo-ui/js/kendo.draganddrop");
    require("@progress/kendo-ui/js/kendo.slider");
    require("@progress/kendo-ui/js/kendo.button");
    require("@progress/kendo-ui/js/kendo.colorpicker");
    require("@progress/kendo-ui/js/kendo.list");
    require("@progress/kendo-ui/js/kendo.combobox");
    require("@progress/kendo-ui/js/kendo.dom");
    require("@progress/kendo-ui/js/kendo.dropdownlist");
    require("@progress/kendo-ui/js/kendo.data.odata");
    require("@progress/kendo-ui/js/kendo.menu");
    require("@progress/kendo-ui/js/kendo.ooxml");
    require("@progress/kendo-ui/js/kendo.sortable");
    require("@progress/kendo-ui/js/kendo.tabstrip");
    require("@progress/kendo-ui/js/kendo.toolbar");
    require("@progress/kendo-ui/js/kendo.treeview");
    require("@progress/kendo-ui/js/kendo.window");
    require("@progress/kendo-ui/js/kendo.validator");
    require("@progress/kendo-ui/js/kendo.excel");
    require("@progress/kendo-ui/js/kendo.drawing");
    require("@progress/kendo-ui/js/kendo.pdf");
    require("@progress/kendo-ui/js/kendo.spreadsheet");

    await loadScript("kendo/js/messages/kendo.messages.de-DE.min.js");

    await loadScript("kendo/js/jszip.min.js");

    kendoJQuery = (kendo as unknown as { jQuery: JQueryStatic })["jQuery"];
    kendoLoaded = true;
  }
  return kendoJQuery;
}

async function loadScript(src: string): Promise<void> {
  await new Promise<void>((resolve, reject): void => {
    const script: HTMLScriptElement = document.createElement("script");
    script.src = src;
    script.addEventListener("load", () => {
      resolve();
    });
    script.addEventListener("error", (e) => {
      reject(e);
    });
    document.body.appendChild(script);
  });
}
