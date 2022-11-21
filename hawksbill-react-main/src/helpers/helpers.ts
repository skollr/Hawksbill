import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import {
  APIKeys,
  APIPaths,
  APIRequestInterface,
  APIResponseInterface,
  APITeamInterface,
  APIUserDataResponseInterface,
  BothCardInterface,
  ChartsInterface,
  HTTPRequestMethods,
  ItemCardInterface,
  OpenRequestItemCardInterface,
  OpenRequestOptionsInterface,
  PercentageInterface,
} from "./interfaces";

export const resultPerPage: number = 1;

// API

export const getToken = async (): Promise<string> => {
  const token = localStorage.getItem(APIKeys.TOKEN);
  if (token !== null) {
    if ((await isExpired(token)).token_is_expired) {
      console.error("Expirado", token);
      const response = await refreshToken();
      if (response.response && response.token !== undefined) {
        setToken(response.token);
        return response.token;
      }
      return token;
    }
    return token;
  }
  return "";
};

export const setToken = (token: string) =>
  localStorage.setItem(APIKeys.TOKEN, token);

export const removeToken = (): void => localStorage.removeItem(APIKeys.TOKEN);

export const setUser = (user: string): void => {
  localStorage.setItem(APIKeys.USER, user);
};

export const getUser = (): string | null => localStorage.getItem(APIKeys.USER);

export const removeUser = (): void => localStorage.removeItem(APIKeys.USER);

export const refreshToken = async (): Promise<APIResponseInterface> => {
  const user = getUser();
  const data: FormData = new FormData();
  if (user !== null) {
    data.append("username", user);
  }
  const response = await sendData(
    `${APIPaths.BASE_URL}/gettoken/`,
    HTTPRequestMethods.POST,
    data
  );
  return response;
};

export const isExpired = async (
  token: string
): Promise<APIUserDataResponseInterface> => {
  const response: Response = await fetch(`${APIPaths.BASE_URL}/token/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return (await response.json()) as Promise<APIUserDataResponseInterface>;
};

// Formatters and validators

export const filteredDigits = (text: string): string[] => {
  const digitRegex: RegExp = /^[\d]{1}$/;
  const nonZeroRegex: RegExp = /^[1-9]{1}$/;
  return Array.from(text).filter((char: string, index: number): boolean =>
    index === 0 ? nonZeroRegex.test(char) : digitRegex.test(char)
  );
};

export const formattedInteger = (
  text: string,
  start: number,
  end: number
): [boolean, string] => {
  const filteredText: string[] = filteredDigits(text).slice(0, end);
  const numberLength = filteredText.length;
  const firstBreakpoint = numberLength % 3;
  const isItValid: boolean = numberLength >= start && numberLength <= end;
  const breakpoints: number[] = [];
  let breakpointAdder = 0;
  while (breakpoints.length < Math.floor(end / 3)) {
    const newBreakpoint = firstBreakpoint + breakpointAdder;
    if (newBreakpoint > 0) {
      breakpoints.push(newBreakpoint);
    }
    breakpointAdder += 3;
  }
  const formattedText = !isItValid
    ? filteredText.join("")
    : filteredText.reduce(
        (previousDigit: string, currentDigit: string, currentIndex: number) =>
          breakpoints.includes(currentIndex)
            ? previousDigit + "." + currentDigit
            : previousDigit + currentDigit,
        ""
      );
  return [isItValid, formattedText];
};

export const onlyDigits = (text: string): string => {
  return filteredDigits(text).join("");
};

export const formattedEmail = (text: string): [boolean, string] => {
  const emailRegex: RegExp =
    /^[a-z\d]{1}[\w.-]{3,}@[\w-]{2,}([.]{1}[\w-]{2,})+$/i;
  return [emailRegex.test(text), text.toLowerCase()];
};

export const checkDate = (text: string): boolean => {
  const dateRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(text);
};

export const checkDates = (startdate: string, enddate: string): boolean => {
  if (checkDate(startdate) && checkDate(enddate)) {
    const start = new Date(startdate);
    const end = new Date(enddate);
    if (end >= start) {
      return true;
    }
    return false;
  }
  return false;
};

export const checkPassword = (text: string): boolean => {
  const lowerCaseRegex: RegExp = /[a-z]+/;
  const upperCaseRegex: RegExp = /[A-Z]+/;
  const digitRegex: RegExp = /\d+/;
  const greaterThanEightRegex: RegExp = /[\s\S]{8,}/;
  return (
    lowerCaseRegex.test(text) &&
    upperCaseRegex.test(text) &&
    digitRegex.test(text) &&
    greaterThanEightRegex.test(text)
  );
};

export const checkRequiredData = (text: string): boolean => {
  const notEmptyRegex: RegExp = /^[\w.áéíóú,;: ()[\]¡!'"¿?*/+-=]+$/i;
  text = text.trim();
  return notEmptyRegex.test(text);
};

export const formatRequestData = (
  requestData: APIRequestInterface[]
): OpenRequestItemCardInterface["data"] =>
  requestData.map((data) => ({
    id: data.id,
    request: {
      cardImageUrl: `${APIPaths.MEDIA_URL}/${data.client_image}`,
      registrationDate: data.registration_date,
      modificationDate: data.modification_date,
      requestType: data.request_type,
      description: data.description,
      applicant: data.applicant,
      technician: data.technician,
      isClosed: data.is_closed,
      position: "",
      openRequestNumber: 0,
      closedRequestNumber: 0,
    },
    card: {
      cardImageUrl: `${APIPaths.MEDIA_URL}/${data.client_image}`,
      info: [
        { detail: "Creado: ", content: data.modification_date },
        { detail: "Tipo: ", content: data.request_type },
      ],
      title: data.client,
    },
  }));

export const formatTeamData = (
  requestData: APITeamInterface[]
): ItemCardInterface["data"] =>
  requestData.map((data) => ({
    id: data.id,
    request: {
      cardImageUrl: `${APIPaths.MEDIA_URL}/${data.user_image}`,
      names: data.names,
      surnames: data.surnames,
      position: data.position,
      openRequestNumber: data.openRequestNumber,
      closedRequestNumber: data.closedRequestNumber,
      description: "",
      registrationDate: "",
      modificationDate: "",
    },
    card: {
      cardImageUrl: `${APIPaths.MEDIA_URL}/${data.user_image}`,
      title: `${data.names} ${data.surnames}`,
    },
  }));

// Sending and receiving data

export const sendData = async (
  destinationURL: string,
  method: HTTPRequestMethods,
  data?: FormData,
  headers?: HeadersInit
): Promise<APIResponseInterface> => {
  const response: Response = await fetch(destinationURL, {
    headers: headers,
    method: method,
    body: data,
  });
  return (await response.json()) as Promise<APIResponseInterface>;
};

export const loginAPI = async (
  user: string,
  password: string
): Promise<APIResponseInterface> => {
  const data: FormData = new FormData();
  data.append(
    "login",
    JSON.stringify({
      username: onlyDigits(user),
      password: password,
    })
  );
  const response: APIResponseInterface = await sendData(
    `${APIPaths.BASE_URL}/login/`,
    HTTPRequestMethods.POST,
    data
  );
  return response;
};

export const logoutAPI = async (
  token: string
): Promise<APIResponseInterface> => {
  const data: FormData = new FormData();
  data.append("token", token);
  const response = await sendData(
    `${APIPaths.BASE_URL}/logout/`,
    HTTPRequestMethods.POST,
    data
  );
  return response;
};

export const createOpenRequest = async (
  client: string,
  type: string,
  description: string,
  applicant: string,
  technician: string
): Promise<APIResponseInterface> => {
  const token = await getToken();
  const data: FormData = new FormData();
  data.append("client", client);
  data.append("type", type);
  data.append("description", description);
  data.append("applicant", applicant);
  data.append("technician", technician);
  const response = await sendData(
    `${APIPaths.BASE_URL}/clientrequest/`,
    HTTPRequestMethods.POST,
    data,
    {
      Authorization: `Token ${token}`,
    }
  );
  return response;
};

export const getReport = async (
  startdate: string,
  enddate: string
): Promise<APIResponseInterface> => {
  const token = await getToken();
  const data: FormData = new FormData();
  data.append("startdate", startdate);
  data.append("enddate", enddate);
  const response = await sendData(
    `${APIPaths.BASE_URL}/getreport/`,
    HTTPRequestMethods.POST,
    data,
    {
      Authorization: `Token ${token}`,
    }
  );
  return response;
};

export const getUserData = async (): Promise<APIUserDataResponseInterface> => {
  const token = await getToken();
  const response: Response = await fetch(`${APIPaths.BASE_URL}/userdata/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return (await response.json()) as Promise<APIUserDataResponseInterface>;
};

export const getOpenRequestOptions =
  async (): Promise<OpenRequestOptionsInterface> => {
    const token = await getToken();
    const clientRequest: Response = await fetch(
      `${APIPaths.BASE_URL}/clients/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const requestTypesRequest: Response = await fetch(
      `${APIPaths.BASE_URL}/requesttype/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const techniciansRequest: Response = await fetch(
      `${APIPaths.BASE_URL}/technicians/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return {
      client: (await clientRequest.json()).data,
      requestTypes: (await requestTypesRequest.json()).data,
      technicians: (await techniciansRequest.json()).data,
    };
  };

export const getRequestData = async (
  setRequestData: React.Dispatch<React.SetStateAction<APIRequestInterface[]>>,
  is_closed: boolean = false
) => {
  const token = await getToken();
  const wsDestination = is_closed
    ? `${APIPaths.WS_URL}/closedrequest/`
    : `${APIPaths.WS_URL}/openrequest/`;
  const socket = new WebSocket(wsDestination);
  socket.addEventListener("open", (): void => {
    socket.send(
      JSON.stringify({
        key: token,
        is_closed: is_closed,
      })
    );
  });
  socket.addEventListener("close", (): void => {
    console.error("Connection has been cut off (WS: Open request)");
  });
  socket.addEventListener("message", async (event) => {
    const data: { data: APIRequestInterface[]; status: number } =
      await JSON.parse(event.data);
    if (data.status === 200) {
      setRequestData(data.data);
    }
  });
};

export const getTeamData = async (
  setRequestData: React.Dispatch<React.SetStateAction<APITeamInterface[]>>
) => {
  const token = await getToken();
  const socket = new WebSocket(`${APIPaths.WS_URL}/teamdata/`);
  socket.addEventListener("open", (): void => {
    socket.send(
      JSON.stringify({
        key: token,
      })
    );
  });
  socket.addEventListener("close", (): void => {
    console.error("Connection has been cut off (WS: Open request)");
  });
  socket.addEventListener("message", async (event) => {
    const data: { data: APITeamInterface[]; status: number } = await JSON.parse(
      event.data
    );
    if (data.status === 200) {
      setRequestData(data.data);
    }
  });
};

export const getRequestStats = async (
  barRoot: am5.Root,
  donutRoot: am5.Root
) => {
  const token = await getToken();
  const socket = new WebSocket(`${APIPaths.WS_URL}/stats/`);
  socket.addEventListener("open", (): void => {
    socket.send(
      JSON.stringify({
        key: token,
      })
    );
  });
  socket.addEventListener("close", (): void => {
    console.error("Connection has been cut off (WS: Open request)");
  });
  socket.addEventListener("message", async (event) => {
    const data: { data: ChartsInterface[]; status: number } = await JSON.parse(
      event.data
    );
    if (data.status === 200) {
      xyChart(barRoot, data.data);
      donutChart(donutRoot, data.data);
    }
  });
};

export const getRequestPercentage = async () => {
  const token = await getToken();
  const socket = new WebSocket(`${APIPaths.WS_URL}/percentage/`);
  socket.addEventListener("open", (): void => {
    socket.send(
      JSON.stringify({
        key: token,
      })
    );
  });
  socket.addEventListener("close", (): void => {
    console.error("Connection has been cut off (WS: Open request)");
  });
  socket.addEventListener("message", async (event) => {
    const data: { data: PercentageInterface[]; status: number } =
      await JSON.parse(event.data);
    if (data.status === 200) {
      linearBarChart(data.data);
    }
  });
};

export const cancelOpenRequest = async (requestId: string): Promise<void> => {
  const token = await getToken();
  const data: FormData = new FormData();
  data.append("id", requestId);
  const response = await sendData(
    `${APIPaths.BASE_URL}/cancelopenrequest/`,
    HTTPRequestMethods.DELETE,
    data,
    {
      Authorization: `Token ${token}`,
    }
  );
  if (response.response && response.redirect !== undefined) {
    window.location.replace(response.redirect);
  }
};

export const closeOpenRequest = async (requestId: string): Promise<void> => {
  const token = await getToken();
  const data: FormData = new FormData();
  data.append("id", requestId);
  const response = await sendData(
    `${APIPaths.BASE_URL}/closeopenrequest/`,
    HTTPRequestMethods.PUT,
    data,
    {
      Authorization: `Token ${token}`,
    }
  );
  if (response.response && response.redirect !== undefined) {
    window.location.replace(response.redirect);
  }
};

// Pagination

const setPaginationInfo = (
  totalResults: number,
  currentResults: number
): [number, number, number] => {
  const displayedResults =
    currentResults + resultPerPage > totalResults
      ? totalResults
      : currentResults + resultPerPage;
  const currentPage = Math.ceil(displayedResults / resultPerPage);
  return [currentPage, displayedResults, totalResults];
};

export const resultsPagination = (
  data: BothCardInterface["data"],
  currentResults: number,
  search: string = ""
): [BothCardInterface["data"], [number, number, number]] => {
  if (search.length === 0) {
    const totalResults = data.length;
    const info = setPaginationInfo(totalResults, currentResults);
    return [data.slice(currentResults, currentResults + resultPerPage), info];
  }
  const dataSearch = data.filter((searchParameter) => {
    if (
      searchParameter.request?.technician !== undefined &&
      searchParameter.request?.technician.detail !== ""
    ) {
      return searchParameter.request.technician.detail
        .toLowerCase()
        .includes(search.toLowerCase());
    } else if (
      searchParameter.card.title !== undefined &&
      searchParameter.card.title !== ""
    ) {
      return searchParameter.card.title
        .toLowerCase()
        .includes(search.toLowerCase());
    } else {
      return true;
    }
  });
  const totalResults = dataSearch.length;
  const info = setPaginationInfo(totalResults, currentResults);
  return [
    dataSearch.slice(currentResults, currentResults + resultPerPage),
    info,
  ];
};

export const nextResultPage = (
  displayedResults: number,
  totalResults: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
): ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) => {
  return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (displayedResults < totalResults) {
      setCurrentPage(currentPage + resultPerPage);
    }
  };
};

export const prevResultPage = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
): ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) => {
  return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (currentPage > 0) {
      setCurrentPage(currentPage - resultPerPage);
    }
  };
};

// Esthetics helpers

export const getCornersClasses = (
  corners: [boolean, boolean, boolean, boolean]
): string => {
  let cornersClasses: string = "";
  corners[0]
    ? (cornersClasses += " reusable__input--top-left-radius")
    : (cornersClasses += "");
  corners[1]
    ? (cornersClasses += " reusable__input--top-right-radius")
    : (cornersClasses += "");
  corners[2]
    ? (cornersClasses += " reusable__input--bottom-right-radius")
    : (cornersClasses += "");
  corners[3]
    ? (cornersClasses += " reusable__input--bottom-left-radius")
    : (cornersClasses += "");
  return cornersClasses;
};

export const preventDrag = (
  event: React.DragEvent<HTMLAnchorElement | HTMLImageElement>
): void => {
  event.preventDefault();
};

export const collapseNavSubLists = (): void => {
  Array.from(
    document.querySelectorAll<HTMLElement>(".side-menu__item-sublist")
  ).forEach((sublist): void => {
    sublist.style.height = "0px";
  });
};

export const linearBarChart = (data: PercentageInterface[]) => {
  const progress_bar: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".linear-bar")
  );
  const progress_bar__bars: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".linear-bar__progress")
  );
  progress_bar.forEach(async (item) => {
    item.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      {
        duration: 1000,
        easing: "ease-in-out",
      }
    );
    item.style.opacity = "1";
  });
  progress_bar__bars.forEach(async (item, percent) => {
    item.animate(
      [
        {
          width: `0%`,
        },
        {
          width: `${data[percent].percentage * 100}%`,
        },
      ],
      {
        duration: 1000,
        easing: "ease-in-out",
      }
    );
    item.style.width = `${data[percent].percentage * 100}%`;
  });
  const percentages: HTMLSpanElement[] = Array.from(
    document.querySelectorAll(".linear-bar__text--percent")
  );
  for (let index = 0; index < Object.keys(data).length; index++) {
    const percentage_value = data[index]["percentage"];
    percentages[index].textContent = `${(percentage_value * 100).toFixed(1)}%`;
  }
};

export const xyChart = (barRoot: am5.Root, data: ChartsInterface[]) => {
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  barRoot.setThemes([
    am5themes_Animated.new(barRoot),
    am5themes_Responsive.new(barRoot),
  ]);
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  const chart = barRoot.container.children.push(
    am5xy.XYChart.new(barRoot, {
      panY: false,
      wheelX: "none",
      wheelY: "none",
      pinchZoomX: false,
      layout: barRoot.verticalLayout,
    })
  );
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  const cursor = chart.set("cursor", am5xy.XYCursor.new(barRoot, {}));
  cursor.lineY.set("visible", false);
  cursor.lineX.set("visible", true);
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  const xRenderer = am5xy.AxisRendererX.new(barRoot, { minGridDistance: 30 });
  xRenderer.labels.template.setAll({
    paddingTop: 15,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Poppins",
    fill: am5.color("#333333"),
    forceHidden: true,
  });
  const yRenderer = am5xy.AxisRendererY.new(barRoot, {});
  yRenderer.labels.template.setAll({
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Poppins",
    fill: am5.color("#333333"),
  });
  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(barRoot, {
      maxDeviation: 0.3,
      categoryField: "category",
      renderer: xRenderer,
    })
  );
  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(barRoot, {
      maxDeviation: 0.3,
      renderer: yRenderer,
    })
  );
  const nTooltip = am5.Tooltip.new(barRoot, {});
  nTooltip.label.setAll({
    fontSize: 12,
    text: "{valueY}",
    fontFamily: "Poppins",
  });
  // Create series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  const series = chart.series.push(
    am5xy.ColumnSeries.new(barRoot, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryXField: "category",
      tooltip: nTooltip,
    })
  );
  barRoot.interfaceColors.set("grid", am5.color(0x999999));
  chart
    .get("colors")
    ?.set("colors", [
      am5.color(0x6771dc),
      am5.color(0x8067dc),
      am5.color(0x67b7dc),
      am5.color(0x6794dc),
    ]);
  series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors")?.getIndex(series.columns.indexOf(target));
  });
  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors")?.getIndex(series.columns.indexOf(target));
  });

  // Set data
  xAxis.data.setAll(data);
  series.data.setAll(data);
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(2000, 100);
  const legend = chart.children.push(
    am5.Legend.new(barRoot, {
      nameField: "categoryX",
      centerX: am5.percent(50),
      x: am5.percent(50),
      marginTop: 15,
      marginBottom: 15,
    })
  );
  legend.data.setAll(series.dataItems);
  legend.labels.template.setAll({
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Poppins",
    fill: am5.color("#333333"),
  });
  legend.itemContainers.template.setAll({
    paddingTop: 4,
    paddingBottom: 0,
  });
  legend.valueLabels.template.setAll({
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Poppins",
    fill: am5.color("#333333"),
  });
  legend.markerRectangles.template.setAll({
    width: 12,
    height: 12,
  });
};

export const donutChart = (donutRoot: am5.Root, data: ChartsInterface[]) => {
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  donutRoot.setThemes([
    am5themes_Animated.new(donutRoot),
    am5themes_Animated.new(donutRoot),
  ]);
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  const chart = donutRoot.container.children.push(
    am5percent.PieChart.new(donutRoot, {
      layout: donutRoot.verticalLayout,
      innerRadius: am5.percent(40),
    })
  );
  // Create series
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  const series = chart.series.push(
    am5percent.PieSeries.new(donutRoot, {
      valueField: "value",
      categoryField: "rating",
      alignLabels: false,
    })
  );
  series.labels.template.setAll({
    forceHidden: true,
  });
  series.ticks.template.setAll({
    forceHidden: true,
  });
  series
    .get("colors")
    ?.set("colors", [
      am5.color(0x6771dc),
      am5.color(0x8067dc),
      am5.color(0x67b7dc),
      am5.color(0x6794dc),
    ]);
  // Set data
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
  series.data.setAll(data);
  //   Create legend
  //   https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
  const legend = chart.children.push(
    am5.Legend.new(donutRoot, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      marginTop: 0,
      marginBottom: 15,
    })
  );
  legend.labels.template.setAll({
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Poppins",
    fill: am5.color("#333333"),
  });
  legend.itemContainers.template.setAll({
    paddingTop: 4,
    paddingBottom: 0,
  });
  legend.valueLabels.template.setAll({
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Poppins",
    fill: am5.color("#333333"),
  });
  legend.markerRectangles.template.setAll({
    width: 12,
    height: 12,
  });
  legend.data.setAll(series.dataItems);
  // Play initial series animation
  // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
  series.appear(1000, 100);
  legend.appear(1000, 100);
};
