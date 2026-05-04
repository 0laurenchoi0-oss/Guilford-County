import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const clients = [
  {
    id: "GC-10452",
    name: "A. Johnson",
    age: 58,
    housing: "Unstable",
    riskScore: 0.93,
    riskLevel: "High",
    calls: 14,
    lastCall: "2026-04-05",
    status: "New",
    staff: "Unassigned",
    nextFollowUp: "2026-04-09",
    flags: ["Frequent caller", "Homelessness flag", "Recent call increase"],
    notes: "No outreach attempted yet. Recommend immediate review and service referral screening.",
  },
  {
    id: "GC-10391",
    name: "M. Brown",
    age: 46,
    housing: "Housed",
    riskScore: 0.88,
    riskLevel: "High",
    calls: 11,
    lastCall: "2026-04-03",
    status: "In Review",
    staff: "Kim",
    nextFollowUp: "2026-04-10",
    flags: ["Repeat non-emergency use", "Behavioral health concern"],
    notes: "Initial outreach completed. Team considering behavioral health referral.",
  },
  {
    id: "GC-10277",
    name: "T. Davis",
    age: 67,
    housing: "Housed",
    riskScore: 0.81,
    riskLevel: "High",
    calls: 9,
    lastCall: "2026-03-30",
    status: "Outreach Attempted",
    staff: "Lee",
    nextFollowUp: "2026-04-08",
    flags: ["Chronic condition", "Missed follow-up"],
    notes: "Reached by phone once. Needs transportation and medication adherence support.",
  },
  {
    id: "GC-10188",
    name: "R. Smith",
    age: 39,
    housing: "Shelter",
    riskScore: 0.76,
    riskLevel: "Medium",
    calls: 7,
    lastCall: "2026-04-01",
    status: "Connected to Services",
    staff: "Jordan",
    nextFollowUp: "2026-04-14",
    flags: ["Prior outreach success"],
    notes: "Connected to housing navigator. Monitor for recurrence.",
  },
];

const monthlyCallTrend = [
  { month: "Nov", calls: 18 },
  { month: "Dec", calls: 22 },
  { month: "Jan", calls: 19 },
  { month: "Feb", calls: 27 },
  { month: "Mar", calls: 24 },
  { month: "Apr", calls: 31 },
];

const modelPerformanceData = [
  {
    model: "Logistic regression",
    prAuc: 0.147,
    rocAuc: 0.929,
    brier: "NA",
    precisionTop88: "22.7%",
  },
  {
    model: "Random forest",
    prAuc: 0.128,
    rocAuc: 0.931,
    brier: 0.114,
    precisionTop88: "15.9%",
  },
];

const capacityThresholdData = [
  {
    model: "Logistic regression",
    patientsFlagged: 22,
    truePositives: 5,
    precision: "22.7%",
    captureRate: "4.8%",
    allPositives: 105,
  },
  {
    model: "Logistic regression",
    patientsFlagged: 88,
    truePositives: 20,
    precision: "22.7%",
    captureRate: "19.0%",
    allPositives: 105,
  },
  {
    model: "Logistic regression",
    patientsFlagged: 100,
    truePositives: 23,
    precision: "23.0%",
    captureRate: "21.9%",
    allPositives: 105,
  },
  {
    model: "Logistic regression",
    patientsFlagged: 200,
    truePositives: 36,
    precision: "18.0%",
    captureRate: "34.3%",
    allPositives: 105,
  },
  {
    model: "Random forest",
    patientsFlagged: 22,
    truePositives: 6,
    precision: "27.3%",
    captureRate: "5.7%",
    allPositives: 105,
  },
  {
    model: "Random forest",
    patientsFlagged: 88,
    truePositives: 14,
    precision: "15.9%",
    captureRate: "13.3%",
    allPositives: 105,
  },
  {
    model: "Random forest",
    patientsFlagged: 100,
    truePositives: 16,
    precision: "16.0%",
    captureRate: "15.2%",
    allPositives: 105,
  },
  {
    model: "Random forest",
    patientsFlagged: 200,
    truePositives: 30,
    precision: "15.0%",
    captureRate: "28.6%",
    allPositives: 105,
  },
];

const thresholdMetrics = [
  { metric: "Accuracy", value: 0.672 },
  { metric: "Recall", value: 0.99 },
  { metric: "Specificity", value: 0.669 },
  { metric: "Precision", value: 0.028 },
  { metric: "F1 score", value: 0.055 },
];

const benchmarkPrograms = [
  {
    program: "Onslow County",
    patients: 213,
    reduction: "67%",
    callsPerPatient: 20,
    callsAverted: 2840,
    totalSavings: "$1,200,000",
    impliedCostPerCall: "$423",
    savingsPerPatient: "$5,634",
  },
  {
    program: "San Diego",
    patients: 51,
    reduction: "33%",
    callsPerPatient: 18,
    callsAverted: 306,
    totalSavings: "$314,000",
    impliedCostPerCall: "$1,026",
    savingsPerPatient: "$6,157",
  },
  {
    program: "Wausau, WI",
    patients: 13,
    reduction: "67%",
    callsPerPatient: 22,
    callsAverted: 191,
    totalSavings: "$100,000",
    impliedCostPerCall: "$524",
    savingsPerPatient: "$7,692",
  },
];

const costBenefitData = [
  {
    workers: 2,
    patientsPerYear: 88,
    callsAverted: 287,
    grossSavings: 215000,
    staffingCost: 75000,
    netSavings: 140000,
    marginalNetSavings: null,
    current: true,
  },
  {
    workers: 3,
    patientsPerYear: 132,
    callsAverted: 401,
    grossSavings: 301000,
    staffingCost: 112000,
    netSavings: 188000,
    marginalNetSavings: 48000,
  },
  {
    workers: 4,
    patientsPerYear: 176,
    callsAverted: 486,
    grossSavings: 365000,
    staffingCost: 150000,
    netSavings: 215000,
    marginalNetSavings: 27000,
  },
  {
    workers: 5,
    patientsPerYear: 220,
    callsAverted: 611,
    grossSavings: 458000,
    staffingCost: 187000,
    netSavings: 271000,
    marginalNetSavings: 56000,
  },
  {
    workers: 6,
    patientsPerYear: 264,
    callsAverted: 691,
    grossSavings: 518000,
    staffingCost: 225000,
    netSavings: 294000,
    marginalNetSavings: 22000,
  },
  {
    workers: 7,
    patientsPerYear: 308,
    callsAverted: 784,
    grossSavings: 588000,
    staffingCost: 262000,
    netSavings: 326000,
    marginalNetSavings: 33000,
  },
  {
    workers: 8,
    patientsPerYear: 352,
    callsAverted: 859,
    grossSavings: 644000,
    staffingCost: 299000,
    netSavings: 345000,
    marginalNetSavings: 18000,
  },
  {
    workers: 9,
    patientsPerYear: 396,
    callsAverted: 1002,
    grossSavings: 752000,
    staffingCost: 337000,
    netSavings: 415000,
    marginalNetSavings: 70000,
    best: true,
  },
  {
    workers: 10,
    patientsPerYear: 417,
    callsAverted: 1027,
    grossSavings: 770000,
    staffingCost: 374000,
    netSavings: 396000,
    marginalNetSavings: -19000,
  },
  {
    workers: 11,
    patientsPerYear: 417,
    callsAverted: 1027,
    grossSavings: 770000,
    staffingCost: 412000,
    netSavings: 358000,
    marginalNetSavings: -37000,
  },
  {
    workers: 12,
    patientsPerYear: 417,
    callsAverted: 1027,
    grossSavings: 770000,
    staffingCost: 449000,
    netSavings: 321000,
    marginalNetSavings: -37000,
  },
  {
    workers: 13,
    patientsPerYear: 417,
    callsAverted: 1027,
    grossSavings: 770000,
    staffingCost: 487000,
    netSavings: 283000,
    marginalNetSavings: -37000,
  },
];

const financeSummary = {
  currentWorkers: 2,
  currentNetSavings: "$140,000",
  bestWorkers: 9,
  bestNetSavings: "$415,000",
  maxSuperUsers: 417,
  costPerCall: "$1,500",
  salaryPerWorker: "$37,426",
  caseloadPerWorker: 11,
  caseDurationMonths: 3,
};

const theme = {
  background: "#FFFFFF",
  panel: "#FAF9F6",
  panelAlt: "#FFFFFF",
  accent: "#1F3C88",
  accentDark: "#3A86FF",
  text: "#1F3C88",
  mutedText: "#6D597A",
  border: "#A8DADC",
  activeNav: "#A8DADC",
  beigePanel: "#FAF9F6",
  whiteCard: "#FFFFFF",
  lightBorder: "#A8DADC",
  lightText: "#1F3C88",
  lightMuted: "#6D597A",
  chartGold: "#F4A261",
  chartTeal: "#2A9D8F",
  chartSoftTeal: "#00B4D8",
  chartBeige: "#3A86FF",
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: theme.background,
    fontFamily: '"Segoe UI", Arial, sans-serif',
    color: theme.text,
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 24px",
    borderBottom: `1px solid ${theme.border}`,
    position: "sticky",
    top: 0,
    backgroundColor: theme.whiteCard,
    zIndex: 20,
  },
  topBarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  burgerButton: {
    backgroundColor: theme.beigePanel,
    color: theme.text,
    border: `1px solid ${theme.border}`,
    borderRadius: "10px",
    width: "46px",
    height: "46px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "5px",
    padding: "0 11px",
  },
  burgerLine: {
    height: "2px",
    backgroundColor: theme.text,
    borderRadius: "999px",
    width: "100%",
  },
  appTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold",
  },
  appSubtitle: {
    margin: "4px 0 0 0",
    color: theme.mutedText,
    fontSize: "13px",
  },
  shell: {
    display: "flex",
    minHeight: "calc(100vh - 83px)",
  },
  sidebar: {
    width: "260px",
    backgroundColor: theme.panel,
    borderRight: `1px solid ${theme.border}`,
    padding: "20px",
    boxSizing: "border-box",
  },
  sidebarTitle: {
    margin: "0 0 14px 0",
    fontSize: "14px",
    color: theme.mutedText,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  navButton: {
    width: "100%",
    textAlign: "left",
    padding: "14px 16px",
    borderRadius: "12px",
    border: `1px solid ${theme.border}`,
    backgroundColor: theme.whiteCard,
    color: theme.text,
    cursor: "pointer",
    marginBottom: "10px",
    fontSize: "15px",
    fontWeight: 600,
  },
  navButtonActive: {
    backgroundColor: theme.activeNav,
    border: `1px solid ${theme.accent}`,
  },
  content: {
    flex: 1,
    padding: "20px",
    boxSizing: "border-box",
    width: "100%",
  },
  pageHeader: {
    marginBottom: "20px",
  },
  pageTitle: {
    margin: "0 0 8px 0",
    fontSize: "34px",
    color: theme.lightText,
  },
  pageSubtitle: {
    margin: 0,
    color: theme.mutedText,
    lineHeight: 1.5,
    maxWidth: "950px",
  },
  sectionTitle: {
    margin: "0 0 14px 0",
    fontSize: "22px",
    color: theme.lightText,
  },
  largePanel: {
    backgroundColor: theme.beigePanel,
    borderRadius: "24px",
    padding: "22px",
    border: `1px solid ${theme.lightBorder}`,
    marginBottom: "28px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "6px",
  },
  overviewStatsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "6px",
  },
  smallCard: {
    backgroundColor: theme.whiteCard,
    color: theme.lightText,
    borderRadius: "18px",
    padding: "18px",
    border: `1px solid ${theme.lightBorder}`,
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "8px 0 4px 0",
  },
  smallText: {
    color: theme.lightMuted,
    fontSize: "13px",
    marginTop: "4px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    alignItems: "start",
    width: "100%",
  },
  toolbar: {
    display: "flex",
    gap: "10px",
    marginBottom: "14px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "220px",
    padding: "12px 14px",
    borderRadius: "12px",
    border: `1px solid ${theme.border}`,
    fontSize: "14px",
    backgroundColor: theme.panelAlt,
    color: theme.lightText,
    outline: "none",
  },
  select: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: `1px solid ${theme.border}`,
    fontSize: "14px",
    backgroundColor: theme.panelAlt,
    color: theme.lightText,
    outline: "none",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  listItem: {
    border: `1px solid ${theme.border}`,
    borderRadius: "16px",
    padding: "16px",
    cursor: "pointer",
    backgroundColor: theme.whiteCard,
    color: theme.lightText,
  },
  activeListItem: {
    border: `2px solid ${theme.accent}`,
    backgroundColor: theme.beigePanel,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },
  darkSmallText: {
    color: theme.lightMuted,
    fontSize: "13px",
    marginTop: "4px",
  },
  callCountBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "78px",
    padding: "8px 14px",
    borderRadius: "999px",
    backgroundColor: theme.accent,
    color: "#FAF9F6",
    fontWeight: "bold",
  },
  callCountNumber: {
    fontSize: "18px",
    lineHeight: 1,
  },
  callCountLabel: {
    fontSize: "11px",
    marginTop: "3px",
    opacity: 0.9,
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px",
    marginBottom: "16px",
  },
  detailBox: {
    backgroundColor: theme.whiteCard,
    color: theme.lightText,
    borderRadius: "14px",
    padding: "14px",
    border: `1px solid ${theme.border}`,
  },
  detailLabel: {
    color: theme.lightMuted,
    fontSize: "13px",
    marginBottom: "4px",
  },
  flagWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "8px",
    marginBottom: "16px",
  },
  flag: {
    backgroundColor: theme.beigePanel,
    border: `1px solid ${theme.border}`,
    color: theme.lightText,
    borderRadius: "999px",
    padding: "8px 12px",
    fontSize: "12px",
  },
  noteTextArea: {
    width: "100%",
    minHeight: "120px",
    backgroundColor: theme.whiteCard,
    border: `1px solid ${theme.border}`,
    color: theme.lightText,
    borderRadius: "14px",
    padding: "14px",
    lineHeight: 1.6,
    marginBottom: "16px",
    fontFamily: '"Segoe UI", Arial, sans-serif',
    fontSize: "15px",
    resize: "vertical",
    outline: "none",
  },
  summaryStack: {
    display: "grid",
    gap: "16px",
  },
  summaryBigCard: {
    backgroundColor: theme.whiteCard,
    color: theme.lightText,
    border: `1px solid ${theme.lightBorder}`,
    borderRadius: "18px",
    padding: "20px",
  },
  summaryHeadline: {
    fontSize: "18px",
    margin: "0 0 10px 0",
  },
  summaryValue: {
    fontSize: "42px",
    fontWeight: "bold",
    margin: "6px 0",
  },
  summaryDivider: {
    height: "1px",
    backgroundColor: theme.lightBorder,
    margin: "10px 0 16px 0",
  },
  insightList: {
    margin: 0,
    paddingLeft: "18px",
    color: theme.lightMuted,
    lineHeight: 1.7,
  },
  accentButton: {
    padding: "12px 16px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: theme.accent,
    color: "#FAF9F6",
    cursor: "pointer",
    fontWeight: "bold",
  },
  chartTitle: {
    color: theme.lightText,
    fontSize: "20px",
    margin: "0 0 8px 0",
  },
  chartSubtitle: {
    color: theme.lightMuted,
    margin: "0 0 18px 0",
    lineHeight: 1.5,
    fontSize: "14px",
  },
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  chartCard: {
    backgroundColor: theme.whiteCard,
    color: theme.lightText,
    borderRadius: "18px",
    padding: "18px",
    border: `1px solid ${theme.lightBorder}`,
    minHeight: "380px",
    boxSizing: "border-box",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "#A8DADC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    zIndex: 100,
  },
  modalCard: {
    width: "100%",
    maxWidth: "720px",
    backgroundColor: theme.whiteCard,
    color: theme.lightText,
    borderRadius: "24px",
    padding: "28px",
    border: `1px solid ${theme.lightBorder}`,
  },
  modalTitle: {
    margin: "0 0 12px 0",
    fontSize: "28px",
  },
  modalText: {
    margin: "0 0 14px 0",
    lineHeight: 1.7,
    color: theme.lightMuted,
  },
  noticeBox: {
    backgroundColor: "#FAF9F6",
    border: "1px solid #F4A261",
    borderRadius: "16px",
    padding: "14px 16px",
    margin: "16px 0 20px 0",
    color: "#1F3C88",
    lineHeight: 1.6,
  },
  modalActions: {
    display: "flex",
    justifyContent: "center",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: theme.whiteCard,
    border: `1px solid ${theme.lightBorder}`,
    borderRadius: "18px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: theme.lightText,
    fontSize: "14px",
  },
  tableHeader: {
    backgroundColor: theme.beigePanel,
    color: theme.lightText,
    fontWeight: "bold",
    textAlign: "left",
    padding: "12px",
    borderBottom: `1px solid ${theme.lightBorder}`,
    whiteSpace: "nowrap",
  },
  tableCell: {
    padding: "12px",
    borderBottom: `1px solid ${theme.lightBorder}`,
    whiteSpace: "nowrap",
  },
  highlightRow: {
    backgroundColor: "#EAF7F7",
  },
  bestRow: {
    backgroundColor: "#FFF4E6",
  },
};

function formatDollar(value) {
  if (value === null || value === undefined) return "---";
  return `$${value.toLocaleString()}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        backgroundColor: theme.whiteCard,
        border: `1px solid ${theme.lightBorder}`,
        borderRadius: "10px",
        padding: "10px 12px",
        color: theme.lightText,
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{label}</div>
      {payload.map((item, index) => (
        <div key={index} style={{ color: theme.lightMuted, fontSize: "14px" }}>
          {item.name}: {item.value}
        </div>
      ))}
    </div>
  );
}

function SimpleTable({ columns, data, rowStyle }) {
  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={styles.tableHeader}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={rowStyle ? rowStyle(row) : {}}>
              {columns.map((column) => (
                <td key={column.key} style={styles.tableCell}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WrappedXAxisTick({ x, y, payload }) {
  const words = payload.value.split(" ");
  const lines = [];

  words.forEach((word) => {
    const currentLine = lines[lines.length - 1];

    if (!currentLine || `${currentLine} ${word}`.length > 16) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = `${currentLine} ${word}`;
    }
  });

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={12}
        textAnchor="middle"
        fill={theme.lightMuted}
        fontSize={12}
      >
        {lines.map((line, index) => (
          <tspan key={index} x={0} dy={index === 0 ? 0 : 14}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function WelcomeModal({ onClose }) {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalCard}>
        <h2 style={styles.modalTitle}>Welcome to Guilford County EMS Dashboard</h2>

        <p style={styles.modalText}>
          This web application is a mock operational dashboard designed by a team of Weitzman School
          of Design Master of City Planning students to show how a Guilford County EMS super user
          case management tool could work. It includes a client dashboard page for case workers to
          review client information, a model results page outlining model performance and super-user
          indicators, and a cost savings page summarizing the amount saved at different staff capacity
          levels.
        </p>

        <p style={styles.modalText}>
          The interface is meant to demonstrate the layout of a possible case management system for
          internal staff use and display the team’s analysis of EMS call data. It is not connected to
          a live database or case management system.
        </p>

        <div style={styles.noticeBox}>
          <strong>Important notice:</strong> all client records, counts, notes, and charts shown in
          this prototype use fake sample data for demonstration purposes only.
        </div>

        <div style={styles.modalActions}>
          <button style={styles.accentButton} onClick={onClose}>
            Enter dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(clients[0].id);
  const [menuOpen, setMenuOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showWelcome, setShowWelcome] = useState(false);

  const [clientNotes, setClientNotes] = useState(() => {
    const initialNotes = {};

    clients.forEach((client) => {
      initialNotes[client.id] = client.notes;
    });

    return initialNotes;
  });

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.id.toLowerCase().includes(search.toLowerCase());

      const matchesRisk = riskFilter === "All" ? true : client.riskLevel === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [search, riskFilter]);

  const selectedClient =
    filteredClients.find((client) => client.id === selectedId) || filteredClients[0] || clients[0];

  const activeClientsCount = clients.length;
  const newCount = clients.filter((client) => client.status === "New").length;
  const overdueCount = 2;

  const unstableHousingCount = clients.filter(
    (client) => client.housing === "Unstable" || client.housing === "Shelter"
  ).length;

  const behavioralHealthCount = clients.filter((client) =>
    client.flags.some((flag) => flag.toLowerCase().includes("behavioral"))
  ).length;

  const frequentCallerCount = clients.filter((client) =>
    client.flags.some((flag) => flag.toLowerCase().includes("frequent caller"))
  ).length;

  const repeatNonEmergencyCount = clients.filter((client) =>
    client.flags.some((flag) => flag.toLowerCase().includes("repeat non-emergency"))
  ).length;

  const totalCalls = clients.reduce((sum, client) => sum + client.calls, 0);
  const avgCallsPerClient = (totalCalls / clients.length).toFixed(1);
  const highestCallVolume = Math.max(...clients.map((client) => client.calls));
  const mediumRiskCount = clients.filter((client) => client.riskLevel === "Medium").length;

  const housingCounts = clients.reduce((acc, client) => {
    acc[client.housing] = (acc[client.housing] || 0) + 1;
    return acc;
  }, {});

  const housingData = Object.entries(housingCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const flagCounts = clients.reduce((acc, client) => {
    client.flags.forEach((flag) => {
      acc[flag] = (acc[flag] || 0) + 1;
    });
    return acc;
  }, {});

  const flagLabelMap = {
    "Homelessness flag": "Homelessness",
    "Recent call increase": "Recent Call Increase",
    "Repeat non-emergency use": "Repeat Non-Emergency",
    "Behavioral health concern": "Behavioral Health",
    "Chronic condition": "Chronic Condition",
    "Missed follow-up": "Missed Follow-up",
    "Prior outreach success": "Prior Outreach Success",
  };

  const flagsData = Object.entries(flagCounts)
    .filter(([name]) => name.toLowerCase() !== "frequent caller")
    .map(([name, value]) => ({
      name: flagLabelMap[name] || name,
      value,
    }));

  const pieColors = [theme.chartGold, theme.chartTeal, theme.chartSoftTeal, theme.chartBeige];

  const selectedVisibleFlags = selectedClient.flags.filter(
    (flag) => flag.toLowerCase() !== "frequent caller"
  );

  const renderDashboardPage = () => (
    <>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Priority Client Dashboard</h1>
        <p style={styles.pageSubtitle}>
          Internal dashboard for reviewing priority clients, identifying high-risk individuals,
          and supporting outreach planning without requiring full case-management integration.
        </p>
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Operational Overview</h2>

        <div style={styles.overviewStatsGrid}>
          <div style={styles.smallCard}>
            <div>Active Clients</div>
            <div style={styles.statNumber}>{activeClientsCount}</div>
            <div style={styles.smallText}>Tracked high-utilizer clients</div>
          </div>

          <div style={styles.smallCard}>
            <div>New Cases</div>
            <div style={styles.statNumber}>{newCount}</div>
            <div style={styles.smallText}>Recently added to the review queue</div>
          </div>

          <div style={styles.smallCard}>
            <div>Overdue Follow-up</div>
            <div style={styles.statNumber}>{overdueCount}</div>
            <div style={styles.smallText}>Clients needing immediate review</div>
          </div>
        </div>
      </div>

      <div style={styles.layout}>
        <div style={styles.largePanel}>
          <h2 style={styles.sectionTitle}>Priority Clients</h2>

          <div style={styles.toolbar}>
            <input
              style={styles.input}
              type="text"
              placeholder="Search by name or client ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              style={styles.select}
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div style={styles.list}>
            {filteredClients.map((client) => {
              const isActive = client.id === selectedClient.id;

              return (
                <div
                  key={client.id}
                  style={isActive ? { ...styles.listItem, ...styles.activeListItem } : styles.listItem}
                  onClick={() => setSelectedId(client.id)}
                >
                  <div style={styles.row}>
                    <div>
                      <strong style={{ fontSize: "16px" }}>{client.name}</strong>
                      <div style={styles.darkSmallText}>{client.id}</div>
                    </div>

                    <div style={styles.callCountBadge}>
                      <span style={styles.callCountNumber}>{client.calls}</span>
                      <span style={styles.callCountLabel}>Calls</span>
                    </div>
                  </div>

                  <div style={styles.row}>
                    <div style={styles.darkSmallText}>Risk Score: {client.riskScore.toFixed(2)}</div>
                    <div style={styles.darkSmallText}>Last Call: {client.lastCall}</div>
                  </div>
                </div>
              );
            })}

            {filteredClients.length === 0 && (
              <div style={styles.smallText}>No clients match your current search or filter.</div>
            )}
          </div>
        </div>

        <div style={styles.largePanel}>
          <h2 style={styles.sectionTitle}>Selected Client Summary</h2>

          {selectedClient ? (
            <>
              <h3 style={{ margin: "0 0 6px 0", color: theme.lightText, fontSize: "20px" }}>
                {selectedClient.name}
              </h3>

              <div style={styles.smallText}>{selectedClient.id}</div>

              <div style={styles.detailGrid}>
                <div style={styles.detailBox}>
                  <div style={styles.detailLabel}>Age</div>
                  <strong>{selectedClient.age}</strong>
                </div>

                <div style={styles.detailBox}>
                  <div style={styles.detailLabel}>Housing</div>
                  <strong>{selectedClient.housing}</strong>
                </div>

                <div style={styles.detailBox}>
                  <div style={styles.detailLabel}>Current Owner</div>
                  <strong>{selectedClient.staff}</strong>
                </div>

                <div style={styles.detailBox}>
                  <div style={styles.detailLabel}>Status</div>
                  <strong>{selectedClient.status}</strong>
                </div>

                <div style={styles.detailBox}>
                  <div style={styles.detailLabel}>Calls</div>
                  <strong>{selectedClient.calls}</strong>
                </div>

                <div style={styles.detailBox}>
                  <div style={styles.detailLabel}>Next Follow-up</div>
                  <strong>{selectedClient.nextFollowUp}</strong>
                </div>
              </div>

              <div style={{ marginBottom: "8px", fontWeight: "bold", color: theme.lightText }}>
                Key Risk Flags
              </div>

              <div style={styles.flagWrap}>
                {selectedVisibleFlags.length > 0 ? (
                  selectedVisibleFlags.map((flag) => (
                    <div key={flag} style={styles.flag}>
                      {flag}
                    </div>
                  ))
                ) : (
                  <div style={styles.smallText}>No additional risk flags shown.</div>
                )}
              </div>

              <div style={{ marginBottom: "8px", fontWeight: "bold", color: theme.lightText }}>
                Summary Note
              </div>

              <textarea
                style={styles.noteTextArea}
                value={clientNotes[selectedClient.id] || ""}
                onChange={(e) =>
                  setClientNotes((prevNotes) => ({
                    ...prevNotes,
                    [selectedClient.id]: e.target.value,
                  }))
                }
              />

              <button style={styles.accentButton}>Contact Us</button>
            </>
          ) : (
            <div style={styles.smallText}>Select a client to view details.</div>
          )}
        </div>
      </div>
    </>
  );

  const renderSummaryPage = () => (
    <>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Model Results</h1>
        <p style={styles.pageSubtitle}>
          Model and population-level results from the EMS super-user risk analysis. This page summarizes
          model performance, outreach capacity thresholds, and key client-level indicators that support
          staffing, planning, and program design conversations.
        </p>
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Model Results Overview</h2>

        <div style={styles.statsGrid}>
          <div style={styles.smallCard}>
            <div>Best PR-AUC</div>
            <div style={styles.statNumber}>0.147</div>
            <div style={styles.smallText}>Logistic regression</div>
          </div>

          <div style={styles.smallCard}>
            <div>Best ROC-AUC</div>
            <div style={styles.statNumber}>0.931</div>
            <div style={styles.smallText}>Random forest</div>
          </div>

          <div style={styles.smallCard}>
            <div>Top 88 Precision</div>
            <div style={styles.statNumber}>22.7%</div>
            <div style={styles.smallText}>Logistic regression at annual capacity</div>
          </div>

          <div style={styles.smallCard}>
            <div>All Positives</div>
            <div style={styles.statNumber}>105</div>
            <div style={styles.smallText}>Observed positives in evaluation set</div>
          </div>
        </div>
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Overall Model Performance</h2>
        <p style={styles.chartSubtitle}>
          PR-AUC and precision at top capacity are especially useful here because super-user prediction
          is an imbalanced problem and the client’s outreach capacity is limited.
        </p>

        <SimpleTable
          columns={[
            { key: "model", label: "Model" },
            { key: "prAuc", label: "PR-AUC" },
            { key: "rocAuc", label: "ROC-AUC" },
            { key: "brier", label: "Brier score" },
            { key: "precisionTop88", label: "Precision @ top 88" },
          ]}
          data={modelPerformanceData}
        />
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Model Performance at Capacity Thresholds</h2>
        <p style={styles.chartSubtitle}>
          This table translates model output into operational capacity: 22 patients reflects current
          simultaneous capacity, 88 reflects estimated annual clients served, and 200 reflects expanded outreach.
        </p>

        <SimpleTable
          columns={[
            { key: "model", label: "Model" },
            { key: "patientsFlagged", label: "Patients flagged" },
            { key: "truePositives", label: "True positives" },
            { key: "precision", label: "Precision" },
            { key: "captureRate", label: "Capture rate" },
            { key: "allPositives", label: "All positives" },
          ]}
          data={capacityThresholdData}
        />
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Classification Metrics at 0.30 Threshold</h2>
        <p style={styles.chartSubtitle}>
          These metrics describe binary classification performance when the selected model uses a 0.30
          risk-score threshold.
        </p>

        <div style={styles.chartGrid}>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Threshold Metrics</h3>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={thresholdMetrics} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.lightBorder} />
                <XAxis dataKey="metric" stroke={theme.lightMuted} />
                <YAxis stroke={theme.lightMuted} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Value" fill={theme.chartSoftTeal} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.summaryBigCard}>
            <h2 style={styles.summaryHeadline}>Model Interpretation</h2>
            <div style={styles.summaryDivider} />
            <p style={{ color: theme.lightMuted, lineHeight: 1.7, margin: 0 }}>
              The model should be used as a prioritization tool, not a final decision-maker. Because
              EMS super-user prediction is highly imbalanced, the most useful question is not only
              whether the model is accurate overall, but whether it can help staff identify a manageable
              queue of high-priority clients for outreach.
            </p>
          </div>
        </div>
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Client Population Indicators</h2>
        <p style={styles.chartSubtitle}>
          These prototype statistics summarize the fake sample client records currently shown in the dashboard.
        </p>

        <div style={styles.statsGrid}>
          <div style={styles.smallCard}>
            <div>Housing Instability</div>
            <div style={styles.statNumber}>{unstableHousingCount}</div>
            <div style={styles.smallText}>Clients who are unstably housed or in shelter</div>
          </div>

          <div style={styles.smallCard}>
            <div>Behavioral Health Flags</div>
            <div style={styles.statNumber}>{behavioralHealthCount}</div>
            <div style={styles.smallText}>Clients with behavioral health concerns noted</div>
          </div>

          <div style={styles.smallCard}>
            <div>Frequent Callers</div>
            <div style={styles.statNumber}>{frequentCallerCount}</div>
            <div style={styles.smallText}>Clients flagged for repeated EMS utilization</div>
          </div>

          <div style={styles.smallCard}>
            <div>Avg Calls per Client</div>
            <div style={styles.statNumber}>{avgCallsPerClient}</div>
            <div style={styles.smallText}>Average call volume across tracked clients</div>
          </div>
        </div>

        <div style={{ ...styles.statsGrid, marginTop: "16px" }}>
          <div style={styles.smallCard}>
            <div>Repeat Non-Emergency Use</div>
            <div style={styles.statNumber}>{repeatNonEmergencyCount}</div>
            <div style={styles.smallText}>Clients with documented repeated non-emergency use</div>
          </div>

          <div style={styles.smallCard}>
            <div>Highest Call Volume</div>
            <div style={styles.statNumber}>{highestCallVolume}</div>
            <div style={styles.smallText}>Maximum calls recorded for a tracked client</div>
          </div>

          <div style={styles.smallCard}>
            <div>Medium Risk</div>
            <div style={styles.statNumber}>{mediumRiskCount}</div>
            <div style={styles.smallText}>Clients below high-risk threshold but still elevated</div>
          </div>

          <div style={styles.smallCard}>
            <div>Total Calls</div>
            <div style={styles.statNumber}>{totalCalls}</div>
            <div style={styles.smallText}>Combined call volume across tracked clients</div>
          </div>
        </div>
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Prototype Client Charts</h2>
        <p style={styles.chartSubtitle}>
          These charts use the current fake sample records and can later be replaced with real dashboard exports.
        </p>

        <div style={styles.chartGrid}>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Housing Distribution</h3>
            <p style={styles.chartSubtitle}>Share of clients by current housing status.</p>

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={housingData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {housingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Flags Breakdown</h3>
            <p style={styles.chartSubtitle}>Count of major risk flags across tracked clients.</p>

            <ResponsiveContainer width="100%" height={285}>
              <BarChart data={flagsData} margin={{ top: 10, right: 20, left: 0, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.lightBorder} />
                <XAxis
                  dataKey="name"
                  stroke={theme.lightMuted}
                  interval={0}
                  height={100}
                  tick={<WrappedXAxisTick />}
                />
                <YAxis stroke={theme.lightMuted} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Count" fill={theme.chartGold} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Calls per Month Over Time</h3>
          <p style={styles.chartSubtitle}>
            Monthly trend line for total call volume. This is mock monthly data for now and can be
            replaced later with real exports.
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyCallTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.lightBorder} />
              <XAxis dataKey="month" stroke={theme.lightMuted} />
              <YAxis stroke={theme.lightMuted} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="calls"
                name="Calls"
                stroke={theme.chartTeal}
                strokeWidth={3}
                dot={{ r: 5, fill: theme.chartGold }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.largePanel}>
        <div style={styles.summaryStack}>
          <div style={styles.summaryBigCard}>
            <h2 style={styles.summaryHeadline}>Operational Takeaway</h2>
            <div style={styles.summaryValue}>88</div>
            <div style={styles.smallText}>Estimated annual client capacity with current staffing</div>
            <div style={styles.summaryDivider} />

            <ul style={styles.insightList}>
              <li>Logistic regression performs better on PR-AUC and precision at current annual capacity.</li>
              <li>Random forest has slightly higher ROC-AUC but lower precision at top 88.</li>
              <li>The dashboard should support ranked review rather than only binary classification.</li>
              <li>Capacity thresholds help connect model output to staffing and outreach planning.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  const renderFinancePage = () => (
    <>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Cost Savings & Staffing Analysis</h1>
        <p style={styles.pageSubtitle}>
          Cost/benefit results estimate how different staffing levels may affect EMS call reduction,
          gross savings, staffing cost, and net savings. This page helps translate the model into
          budget and staffing conversations.
        </p>
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Finance Overview</h2>

        <div style={styles.statsGrid}>
          <div style={styles.smallCard}>
            <div>Current Staffing</div>
            <div style={styles.statNumber}>{financeSummary.currentWorkers}</div>
            <div style={styles.smallText}>Social workers currently on staff</div>
          </div>

          <div style={styles.smallCard}>
            <div>Current Net Savings</div>
            <div style={styles.statNumber}>{financeSummary.currentNetSavings}</div>
            <div style={styles.smallText}>Estimated net savings at current staffing</div>
          </div>

          <div style={styles.smallCard}>
            <div>Highest Net Savings</div>
            <div style={styles.statNumber}>{financeSummary.bestNetSavings}</div>
            <div style={styles.smallText}>Estimated at 9 workers</div>
          </div>

          <div style={styles.smallCard}>
            <div>Identified Super Users</div>
            <div style={styles.statNumber}>{financeSummary.maxSuperUsers}</div>
            <div style={styles.smallText}>Savings capped at identified super users</div>
          </div>
        </div>
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Cost/Benefit Assumptions</h2>

        <div style={styles.statsGrid}>
          <div style={styles.smallCard}>
            <div>Cost per EMS Call</div>
            <div style={styles.statNumber}>{financeSummary.costPerCall}</div>
            <div style={styles.smallText}>Placeholder estimate used in model</div>
          </div>

          <div style={styles.smallCard}>
            <div>Annual Salary</div>
            <div style={styles.statNumber}>{financeSummary.salaryPerWorker}</div>
            <div style={styles.smallText}>Per social worker</div>
          </div>

          <div style={styles.smallCard}>
            <div>Caseload</div>
            <div style={styles.statNumber}>{financeSummary.caseloadPerWorker}</div>
            <div style={styles.smallText}>Patients per worker</div>
          </div>

          <div style={styles.smallCard}>
            <div>Case Duration</div>
            <div style={styles.statNumber}>{financeSummary.caseDurationMonths} mo.</div>
            <div style={styles.smallText}>Median time on caseload</div>
          </div>
        </div>
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Net Savings by Staffing Level</h2>
        <p style={styles.chartSubtitle}>
          The mid-range scenario assumes a 50% call reduction. In this model, the highest estimated
          net savings occurs at 9 workers; after that, additional staffing cost is no longer fully offset
          by savings.
        </p>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={costBenefitData} margin={{ top: 10, right: 24, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.lightBorder} />
            <XAxis dataKey="workers" stroke={theme.lightMuted} />
            <YAxis stroke={theme.lightMuted} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip
              formatter={(value) => formatDollar(value)}
              labelFormatter={(label) => `${label} workers`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="netSavings"
              name="Net savings"
              stroke={theme.chartTeal}
              strokeWidth={3}
              dot={{ r: 5, fill: theme.chartGold }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="staffingCost"
              name="Staffing cost"
              stroke={theme.chartGold}
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Mid-Range Scenario Table</h2>
        <p style={styles.chartSubtitle}>
          Current staffing is highlighted in light blue. The highest estimated net savings is highlighted
          in light orange.
        </p>

        <SimpleTable
          columns={[
            { key: "workers", label: "Workers" },
            { key: "patientsPerYear", label: "Patients/year" },
            { key: "callsAverted", label: "Calls averted" },
            { key: "grossSavings", label: "Gross savings", render: formatDollar },
            { key: "staffingCost", label: "Staffing cost", render: formatDollar },
            { key: "netSavings", label: "Net savings", render: formatDollar },
            { key: "marginalNetSavings", label: "Marginal net savings", render: formatDollar },
          ]}
          data={costBenefitData}
          rowStyle={(row) => {
            if (row.best) return styles.bestRow;
            if (row.current) return styles.highlightRow;
            return {};
          }}
        />
      </div>

      <div style={styles.largePanel}>
        <h2 style={styles.sectionTitle}>Reference Program Benchmarks</h2>
        <p style={styles.chartSubtitle}>
          These benchmarks compare reported call reductions and estimated savings from similar programs.
        </p>

        <SimpleTable
          columns={[
            { key: "program", label: "Program" },
            { key: "patients", label: "Patients" },
            { key: "reduction", label: "Reduction" },
            { key: "callsPerPatient", label: "Calls/pt/yr" },
            { key: "callsAverted", label: "Calls averted" },
            { key: "totalSavings", label: "Total savings" },
            { key: "impliedCostPerCall", label: "Implied $/call" },
            { key: "savingsPerPatient", label: "Savings/patient" },
          ]}
          data={benchmarkPrograms}
        />
      </div>

      <div style={styles.largePanel}>
        <div style={styles.summaryStack}>
          <div style={styles.summaryBigCard}>
            <h2 style={styles.summaryHeadline}>Finance Takeaway</h2>
            <div style={styles.summaryDivider} />

            <p style={{ color: theme.lightMuted, lineHeight: 1.7, margin: 0 }}>
              The cost/benefit analysis suggests that expanding outreach capacity could generate
              meaningful net savings if reduced EMS utilization offsets staffing costs. The highest
              estimated net savings in the mid-range scenario occurs around 9 workers.
            </p>
          </div>

          <div style={styles.summaryBigCard}>
            <h2 style={styles.summaryHeadline}>Planning Implication</h2>
            <div style={styles.summaryValue}>9</div>
            <div style={styles.smallText}>Estimated optimal staffing level in the mid-range scenario</div>
            <div style={styles.summaryDivider} />

            <ul style={styles.insightList}>
              <li>Current staffing can serve about 88 patients per year.</li>
              <li>At 9 workers, estimated net savings reach about $415,000.</li>
              <li>After 9 workers, marginal net savings turn negative in the mid-range scenario.</li>
              <li>The finance page can help the client discuss staffing needs using concrete cost estimates.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div style={styles.page}>
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <button style={styles.burgerButton} onClick={() => setMenuOpen(!menuOpen)}>
            <span style={styles.burgerLine} />
            <span style={styles.burgerLine} />
            <span style={styles.burgerLine} />
          </button>

          <div>
            <h1 style={styles.appTitle}>Guilford County Government</h1>
            <p style={styles.appSubtitle}>High utilizer dashboard prototype</p>
          </div>
        </div>
      </div>

      <div style={styles.shell}>
        {menuOpen && (
          <aside style={styles.sidebar}>
            <div style={styles.sidebarTitle}>Navigation</div>

            <button
              style={{
                ...styles.navButton,
                ...(currentPage === "dashboard" ? styles.navButtonActive : {}),
              }}
              onClick={() => setCurrentPage("dashboard")}
            >
              Dashboard
            </button>

            <button
              style={{
                ...styles.navButton,
                ...(currentPage === "summary" ? styles.navButtonActive : {}),
              }}
              onClick={() => setCurrentPage("summary")}
            >
              Model Results
            </button>

            <button
              style={{
                ...styles.navButton,
                ...(currentPage === "finance" ? styles.navButtonActive : {}),
              }}
              onClick={() => setCurrentPage("finance")}
            >
              Cost Savings
            </button>
          </aside>
        )}

        <main style={styles.content}>
          {currentPage === "dashboard" && renderDashboardPage()}
          {currentPage === "summary" && renderSummaryPage()}
          {currentPage === "finance" && renderFinancePage()}
        </main>
      </div>
    </div>
  );
}

export default App;