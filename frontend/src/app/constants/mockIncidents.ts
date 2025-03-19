// Mock data for incidents
export const mockIncidents = [
    {
        id: "INC-2025-04123",
        detections: [
            { technique: "Execution", tactic: "PowerShell", count: 6 },
            { technique: "Privilege Escalation", tactic: "UAC Bypass", count: 4 },
            { technique: "Discovery", tactic: "System Information Discovery", count: 4 },
            { technique: "Credential Access", tactic: "Credential Dumping", count: 6 },
        ],
        score: 7.8,
        severity: "High",
        host: {
            hostname: "WKSTN-ENG-12",
            externalIp: "203.0.113.12",
            localIp: "10.24.20.12",
            operatingSystem: "Windows 10 Pro"
        },
        timeline: {
            startDateTime: "2025-03-16T10:05:30Z",
            endDateTime: "2025-03-16T18:20:45Z"
        },
        ticket: {
            serialNumber: "INC-2025-04123",
            assignedTo: "Michael Lee",
            status: "Investigating"
        }
    },
    {
        id: "INC-2025-04257",
        detections: [
            { technique: "Credential Access", tactic: "Brute Force", count: 9 }
        ],
        score: 9.2,
        severity: "Critical",
        host: {
            hostname: "WKSTN-LEGAL-05",
            externalIp: "203.0.113.5",
            localIp: "10.24.22.5",
            operatingSystem: "Windows 11 Enterprise"
        },
        timeline: {
            startDateTime: "2025-03-15T08:45:12Z",
            endDateTime: "2025-03-15T14:32:49Z"
        },
        ticket: {
            serialNumber: "INC-2025-04257",
            assignedTo: "Emma Davis",
            status: "Escalated"
        }
    },
    {
        id: "INC-2025-04389",
        detections: [
            { technique: "Discovery", tactic: "System Information Discovery", count: 4 },
            { technique: "Credential Access", tactic: "Credential Dumping", count: 6 }
        ],
        score: 6.5,
        severity: "Medium",
        host: {
            hostname: "WKSTN-HR-33",
            externalIp: "203.0.113.33",
            localIp: "10.24.25.33",
            operatingSystem: "Windows 10 Enterprise"
        },
        timeline: {
            startDateTime: "2025-03-14T16:30:00Z",
            endDateTime: "2025-03-14T20:15:30Z"
        },
        ticket: {
            serialNumber: "INC-2025-04389",
            assignedTo: "Olivia Martinez",
            status: "Open"
        }
    },
    {
        id: "INC-2025-04521",
        detections: [
            { technique: "Lateral Movement", tactic: "Remote Desktop Protocol", count: 7 },
            { technique: "Execution", tactic: "Scripting", count: 3 }
        ],
        score: 8.1,
        severity: "High",
        host: {
            hostname: "WKSTN-FINANCE-21",
            externalIp: "203.0.113.21",
            localIp: "10.24.30.21",
            operatingSystem: "Windows 11 Pro"
        },
        timeline: {
            startDateTime: "2025-03-13T09:10:11Z",
            endDateTime: "2025-03-13T13:55:47Z"
        },
        ticket: {
            serialNumber: "INC-2025-04521",
            assignedTo: "Liam Thompson",
            status: "Investigating"
        }
        },
        {
        id: "INC-2025-04678",
        detections: [
            { technique: "Persistence", tactic: "Scheduled Tasks", count: 5 }
        ],
        score: 5.7,
        severity: "Medium",
        host: {
            hostname: "WKSTN-IT-77",
            externalIp: "203.0.113.77",
            localIp: "10.24.35.77",
            operatingSystem: "Windows Server 2019"
        },
        timeline: {
            startDateTime: "2025-03-12T12:20:30Z",
            endDateTime: "2025-03-12T16:45:15Z"
        },
        ticket: {
            serialNumber: "INC-2025-04678",
            assignedTo: "Sophia Wilson",
            status: "Closed"
        }
        },
        {
        id: "INC-2025-04830",
        detections: [
            { technique: "Defense Evasion", tactic: "Obfuscated Files", count: 3 }
        ],
        score: 4.3,
        severity: "Medium",
        host: {
            hostname: "WKSTN-ENG-98",
            externalIp: "203.0.113.98",
            localIp: "10.24.40.98",
            operatingSystem: "Windows 10 Pro"
        },
        timeline: {
            startDateTime: "2025-03-11T14:50:42Z",
            endDateTime: "2025-03-11T19:10:33Z"
        },
        ticket: {
            serialNumber: "INC-2025-04830",
            assignedTo: "James Brown",
            status: "Open"
        }
    },
    {
        id: "INC-2025-04975",
        detections: [
            { technique: "Exfiltration", tactic: "Data Transfer", count: 8 },
            { technique: "Credential Access", tactic: "Password Spraying", count: 5 }
        ],
        score: 9.0,
        severity: "Critical",
        host: {
            hostname: "WKSTN-SALES-50",
            externalIp: "203.0.113.50",
            localIp: "10.24.45.50",
            operatingSystem: "Windows 10 Enterprise"
        },
        timeline: {
            startDateTime: "2025-03-10T11:12:55Z",
            endDateTime: "2025-03-10T18:22:07Z"
        },
        ticket: {
            serialNumber: "INC-2025-04975",
            assignedTo: "Emily White",
            status: "Escalated"
        }
    },
    {
        id: "INC-2025-05089",
        detections: [
            { technique: "Lateral Movement", tactic: "SMB Relay", count: 6 }
        ],
        score: 7.2,
        severity: "High",
        host: {
            hostname: "WKSTN-MKTG-88",
            externalIp: "203.0.113.88",
            localIp: "10.24.50.88",
            operatingSystem: "Windows 11 Pro"
        },
        timeline: {
            startDateTime: "2025-03-09T09:40:00Z",
            endDateTime: "2025-03-09T12:30:45Z"
        },
        ticket: {
            serialNumber: "INC-2025-05089",
            assignedTo: "Daniel Harris",
            status: "Investigating"
        }
    },
    {
        id: "INC-2025-05234",
        detections: [
            { technique: "Execution", tactic: "Office Macros", count: 4 }
        ],
        score: 5.2,
        severity: "Medium",
        host: {
            hostname: "WKSTN-FINANCE-15",
            externalIp: "203.0.113.15",
            localIp: "10.24.55.15",
            operatingSystem: "Windows 10 Enterprise"
        },
        timeline: {
            startDateTime: "2025-03-08T07:30:25Z",
            endDateTime: "2025-03-08T11:45:12Z"
        },
        ticket: {
            serialNumber: "INC-2025-05234",
            assignedTo: "Isabella Moore",
            status: "Open"
        }
    },
];