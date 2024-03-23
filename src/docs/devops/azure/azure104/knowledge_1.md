# Azure 104

## Cloud Administrator Role

- Cloud Administrators manage the cloud services that span storage, networking and compute cloud capabilities, with a deep understanding of each service across the full lifecycle.
- They take end-user requests for new cloud applications and make recommendations on services to use for optimal performance and scale as well as provision, capacity, monitor and adjust as appropriate. This role requires communicating and coordinating with vendors.
- Cloud Administrators use the Azure Portal and as they become more proficient, they use PowerShell and the Command Line Interface.
- Successful Cloud Administrators start this role with experience on operating systems, virtualization, cloud infrastructure, storage structures, and networking.

## About this Course: Prerequisites

Successful Azure Adminstrators start this role with experience on operating systems, virtualization, clolud infrastructure, storage structures, and networking.
- Understanding of on-premises virtualization technologies, including: VMs, virtual networking, and virtual hard disks.
- Understanding of network configuration, including TCP/IP, Domain Name System (DNS), virtual private networks (VPNs), firewalls, and encryption technologies.
- Understanding of Active Directory concepts, such as users, groups, and role-based access control.
- Understanding of resilience and disaster recovery, including backup and restore operations.

| Study Areas                               | Weights |
|:-----------------------------------------:|:-------:|
| Manage Azure identities and governance    | 15-20%  |
| Implement and manage storage              | 10-15%  |
| Deploy and manage Azure compute resources | 25-30%  |
| Configure and manage virtual networking   | 30-35%  |
| Monitor and backup resources              | 10-15%  |


## Module 01: Identity
### Azure Active Directory Overview
- Azure Active Directory
- Azure AD Concepts
- Azure Active Directory Editions
- Multi-Factor Authentication

#### Azure Active Directory

![image](/devops/azure/k_01.jpg)

- A cloud-based suite of identity management capabilities that enables you to securely manage access to Azure services and resources for your users.
- Provides application management, authentication, device management, and hybrid identity.

#### Azure AD Concepts

| Concept            | Description                                                                                                                                           |
|:------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------:|
| Identity           | An object that can be authenticated.                                                                                                                  |
| Account            | An identity that has data associated with it.                                                                                                         |
| Azure AD Account   | An identity created through Azure AD or another Microsoft cloud service.                                                                              |
| Azure tenant       | A dedicated and trusted instance of Azure AD that's automatically created when your organization signs up for a Microsoft cloud service subscription. |
| Azure AD directory | Each Azure tenant has a dedicated and trusted Azure AD directory.                                                                                     |
| User subscription  | Used to pay for Azure cloud services.                                                                                                                 |

#### Azure Active Directory Editions

| No object limit            | Free            | Office 365 Apps | Premium P1      | Premium P2      |
|:--------------------------:|:---------------:|:---------------:|:---------------:|:---------------:|
| Directory Objects          | 500,000 objects | No object limit | No object limit | No object limit |
| Single Sign-On             | Up to 10 apps   | Up to 10 apps   | Unlimited       | Unlimited       |
| Core Identity and Access   | X               | X               | X               | X               |
| B2B Collaboration          | X               | X               | X               | X               |
| Identity & Access for O365 |                 | X               | X               | X               |
| Premium Features           |                 |                 | X               | X               |
| Hybrid Identities          |                 |                 | X               | X               |
| Advanced Group Access      |                 |                 | X               | X               |
| Conditional Access         |                 |                 | X               | X               |
| Identity Protection        |                 |                 |                 | X               |
| Identity Governance        |                 |                 |                 | X               |

#### Multi-Factor Authentication

![image](/devops/azure/k_02.jpg)

- Provides two step authentication verification
- Lets you enforce controls on access to access to apps based on specific conditions

### Users and Groups Overview
- User Accounts
- Managing User Accounts
- Bulk User Accounts
- Group Accounts
- Azure AD Connect
- Azure AD Connect Health
- Azure AD B2B and B2C
- Demonstration - Users and Groups

#### User Accounts

![image](/devops/azure/k_03.jpg)

- All users must have an account
- The account is used for authentication and authorization
- Identity Sources: Cloud, Directory-synchronized, and Guest

#### Managing User Accounts

- Must be Global Administrator or User Administrator to manage users
- User profile (picture, job, contact info) is optional
- Deleted users can be restored for 30 days
- Sign in and audit log information is available

#### Bulk User Accounts

- Create the comma-separated values (CSV) file with the list of all the users and their properties
- Loop through the file processing each user
- Consider error handling, duplicate users, initial password settings, empty properties, and when the account is enabled

#### Group Accounts

- Group Types
    - Security groups
    - Office 365 groups
- Assignment Types
    - Assigned
    - Dynamic User
    - Dynamic Device (Security groups only)

#### Azure AD Connect

![image](/devops/azure/k_04.jpg)

- Integrate your on-premises directories with Azure Active Directory
- Provides a common identity for your users for Office 365, Azure, and SaaS applications integrated with Azure AD
- There are serveral authentication options - password hash synchronization and pass-through authentication

#### Azure AD Connect Health

![image](/devops/azure/k_05.jpg)

- Monitor and gain insights into AD FS servers, Azure AD Connect, and AD domain controllers
- Monitor and gain insights into the snchronizations that occur between your on-premises AD DS and Azure AD
- Monitor and gain insights into your on-premises identity infrastructure that is used to access Office 365 or other Azure AD applications

#### Azure AD B2B and B2C

- Business to Business (B2B)
    - Inviting users from other Azure AD Tenants into your own organization tenant
    - User provisioning is done by the invited party
- Business to Customer (B2C)
    - Inviting users from other social media Identity Tenants into your own organization tenant
    - User provisioning is down by the invited party; you are in control to invite the other side's users

## Module 02: Governance and Compliance

### Subscriptions and Accounts Overview

- Regions
- Azure Subscriptions
- Getting a Subscription
- Subscription Usage
- Cost Management
- Resource Tags
- Cost Savings

#### Regions

- Aregion represents a collection of datacenters
- Provides flexibility and scale
- Preserves data residency
- Select regions close to your users
- Be aware of region deployment availability
- There are global services that are region independent
- Regions are paired for gigh availability

#### Azure Subscriptions

![image](/devops/azure/k_06.jpg)

- Logical unit of Azure services that is linked to an Azure account
- Security and billing boundary
- Includes accounts - identities in Azure Active Directory (Azure AD) or in a directory that is trusted by Azure AD, such as a work or school organization. 

##### Getting a Subscription

- Enterprise Agreement customers make an upfront monetary commitment and consume services throughout the yaer
- Resellers provide a simple, flexible eay to purchase cloud services
- Partners can design and implement your Azure cloud solution
- Personal free account - start right away

#### Cost Management

- Conduct cost analysis
- Create a budget
- Review recommendations
- Export the data

#### Resource Tags 

![image](/devops/azure/k_07.jpg)

- Provides metadata for your Azure resources
- Logically organizes resources into a taxonomy
- Consists of a name-value pair
- Very useful for rolling up billing information

#### Cost Savings

![image](/devops/azure/k_08.jpg)

- Azure Reservations - helps you save money by pre-paying for services
- Azure Hybrid Benefits - use Windows Server and SQL Server on-premises licenses with Software Assurance
- Azure Credits - monthly credit benefit that allows you to experiment with, develop, and test new solutions on Azure
- Regions - Choose low-cost locations and regions


### Azure Policy Overview

- Management Groups
- Creating Management Groups
- Azure Policy
- Implementing Azure Policy
- Policy Definitions
- Create Initiative Definitions
- Scope the Initiative Definition
- Determine Compliance

#### Management Groups

![image](/devops/azure/k_09.jpg)

- Provides a level of scope above subscriptions
- Targeting of policies and spend budgets across subscriptions and inheritance down the hierarchies
- Compliance and cost reporting by organization (business/teams)

##### Creating Management Groups

- The **Manahement Group ID** is the directory unique identifier that is used to submit commands on this management group
- The Display Name field is the name that is displayed within the Azure potal

#### Azure Policy

| Usage Cases                                                                                                                  |
|------------------------------------------------------------------------------------------------------------------------------|
| **Allowed resource types** - Specify the resource types that your organization can deploy.                                   |
| **Allowed virtual machine SKUs** - Specify a set of virtual machine SKUs that your organization can deploy.                  |
| **Allowed locations** - Restrict the locations your organization can specify when deploying resources.                       |
| **Require tag and its value** - Enforces a required tag and its value.                                                       |
| **Azure Backup should be enabled for Virtual Machines** - Audit if Azure Backup service is enabled for all Virtual machines. |

- Azure Policy is a service in Azure that you use to create, assign and, manage policies
- Azure Policy runs evaluations and scans for non-compliant resources
- Advantages:
    - Enforcement and compliance
    - Apply policies at scale
    - Remediation

##### Implementing Azure Policy

![image](/devops/azure/k_10.jpg)

1. Browse Policy Definitions
2. Create Initiative Definitions
3. Scope the Initiative Definition
4. View Policy evaluation results


### Role-Based Access Control Overview

- Role-Based Access Control
- Azure RBAC Roles vs Azure AD Administrator Roles
- RBAC Authentication
- Azure RBAC Roles

#### Role-Based Access Control

- Provides fine-grained access management of resources in Azure
    - Built on Azure Resource Manager
    - Segregate duties within your team
    - Grant only the amount of access to users that they need to perform their jobs
- Concepts
    - **Security principal**. Object that represents something that us requesting access to resources
    - **Role definition**. Collection of permissions that lists the operations that can be performed
    - **Scope**. Boundary for the level of access that is requested
    - **Assignment**. Attaching a role definition to a security principal at a particular scope
        - Users can grant access described in a role definition by creating an assignment

#### Azure RBAC Roles vs Azure AD Administrator Roles

Azure and Azure AD offer two types of RBAC roles

| Azure RBAC roles                                                                                                              | Azure AD roles                                                                                                                          |
|:-----------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------:|
| Manage access to Azure resources                                                                                              | Manage access to Azure AD objects                                                                                                       |
| Scope can be specified at multiple levels                                                                                     | Scope is at the tenant level                                                                                                            |
| Role information can be accessed in the Azure portal, Azure CLI, Azure PowerShell, Azure Resource Manager templates, REST API | Role information can be accessed in Azure portal, Office 365 admin portal, Microsoft Graph, Azure Active Directory PowerShell for Graph |

![image](/devops/azure/k_11.jpg)

#### Azure RBAC Roles

| RABC role in Azure        | Permissions                                                                         | Notes                                                                                                                                      |
|:-------------------------:|:-----------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------:|
| Owner                     | Has full access to all resources and can delegate access to others.                 | The Service Administrator and Co-Administrators are assigned the Owner role at the subscription scope. This applies to all resource types. |
| Contributor               | Creates and manages all types of Azure resources but cannot grant access to others. | This applies to all resource types.                                                                                                        |
| Reader                    | View Azure resources.                                                               | This applies to all resource types.                                                                                                        |
| User Access Administrator | Manages user access to Azure resources.                                             | This applies to managing access, rather than to managing resources.                                                                        |
.

## Module 03: Azure Administration
## Module 04: Virtual Networking
## Module 05: Intersite Connectivity
## Module 06: Network Traffic Management
## Module 07: Azure Storage
## Module 08: Azure Virtual Machines
## Module 09: Serverless Computing
## Module 10: Data Protection
## Module 11: Monitoring