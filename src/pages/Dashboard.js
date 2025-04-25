import React, { useState } from "react";
import { fetchContributionData } from "../services/fetchCommits";
import "../styles/styles.css";

const Dashboard = () => {
    const [selectedOrg, setSelectedOrg] = useState("");
    const [selectedRepo, setSelectedRepo] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Organizations & Repositories Mapping
    const ORGANIZATIONS = {
        "HWAI-CST": ["LobbyClientUI-R1", "LobbyMiddlewareAPI-R1", "LobbyAdminServerAPI-R1", "LobbyHeartbeatAutomationUI-R1", "HubspotIntegrationAPI-R1", "LobbyAdminPanelUI-R1", "LobbyServerAPI-R1"],
        "HWAI-MarketIntel": ["EnrollmentTrendsUI-R4", "EnrollmentTrendsAPI-R4", "CompetitorAnalysisUI-R1", "CompetitorAnalysisAPI-R1"],
        "HWAI-NetworkIntel": ["PNCOneToManyUI-R1", "PNCOneToManyAPI-R1", "NetworkAdequacyUI-R1", "NetworkAdequacyAPI-R1", "NPISearchUI-R4", "ProviderNetworkComparisonUI-R4", "ProviderNetworkComparisonAPI-R4", "NPISearchAPI-R4"],
        "HWAI-XAI": ["ProductScorecardUI-R1", "BenefitSimulatorUI-R3.1", "BenefitSimulatorAPI-R3.1", "BenefitSimulatorAPI-R3", "ProductScorecardAPI-R1", "BenefitSimulatorUI-R3"]
    };

    const USERS = ["ArulTEG", "ArunPrem_APP", "deepesh-tech", "Mukul Kumar", "suneelkumar02", "dhorinaresh", "ankit_sde@hwai", "bindu-e", "Kritika-sharma12", "Promod Kr Verma", "satyajeet-HealthworksAI", "Rajeev Rawat", "vibhore-go", "vidushi-chaudhary"];

    // Fetch Contributions
    const handleFetchData = async () => {
        if (!selectedOrg || !selectedRepo || !selectedUser) {
            alert("Please select Organization, Repository & User!");
            return;
        }

        setLoading(true);
        const data = await fetchContributionData(selectedOrg, selectedRepo, selectedUser);
        setContributions(data.length > 0 ? [data] : []);
        setLoading(false);
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="header">
                <div className="logo">HealthWorks AI</div>
                <div className="user-info">👤 Naresh</div>
            </div>

            {/* Filters */}
            <div className="filter-section">
                <div className="dropdown">
                    <label>Organization</label>
                    <select value={selectedOrg} onChange={(e) => {
                        setSelectedOrg(e.target.value);
                        setSelectedRepo("");
                    }}>
                        <option value="">Select Organization</option>
                        {Object.keys(ORGANIZATIONS).map((org) => (
                            <option key={org} value={org}>{org}</option>
                        ))}
                    </select>
                </div>

                <div className="dropdown">
                    <label>Repository</label>
                    <select value={selectedRepo} onChange={(e) => setSelectedRepo(e.target.value)} disabled={!selectedOrg}>
                        <option value="">Select Repository</option>
                        {selectedOrg && ORGANIZATIONS[selectedOrg].map((repo) => (
                            <option key={repo} value={repo}>{repo}</option>
                        ))}
                    </select>
                </div>

                <div className="dropdown">
                    <label>User</label>
                    <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="">Select User</option>
                        {USERS.map((user) => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                </div>

                <button className="execute-btn" onClick={handleFetchData}>Execute</button>
            </div>

            {/* Contribution Table */}
            <div className="table-container">
                {loading ? (
                    <div className="loading">Fetching data...</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Repository</th>
                                <th>Commits</th>
                                <th>Additions</th>
                                <th>Deletions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contributions.length > 0 ? (
                                contributions.map((contrib, index) => (
                                    <tr key={index}>
                                        <td>{contrib.user}</td>
                                        <td>{contrib.repo}</td>
                                        <td>{contrib.commits}</td>
                                        <td style={{ color: "green" }}>+{contrib.additions}</td>
                                        <td style={{ color: "red" }}>-{contrib.deletions}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-data">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
