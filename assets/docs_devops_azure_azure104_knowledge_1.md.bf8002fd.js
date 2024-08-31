import{_ as e,o as t,c as a,Q as i}from"./chunks/framework.f9076d03.js";const r=JSON.parse('{"title":"Azure 104","description":"","frontmatter":{},"headers":[],"relativePath":"docs/devops/azure/azure104/knowledge_1.md","filePath":"docs/devops/azure/azure104/knowledge_1.md","lastUpdated":1711187118000}'),n={name:"docs/devops/azure/azure104/knowledge_1.md"},l=[i('<h1 id="azure-104" tabindex="-1">Azure 104 <a class="header-anchor" href="#azure-104" aria-label="Permalink to &quot;Azure 104&quot;">​</a></h1><h2 id="cloud-administrator-role" tabindex="-1">Cloud Administrator Role <a class="header-anchor" href="#cloud-administrator-role" aria-label="Permalink to &quot;Cloud Administrator Role&quot;">​</a></h2><ul><li>Cloud Administrators manage the cloud services that span storage, networking and compute cloud capabilities, with a deep understanding of each service across the full lifecycle.</li><li>They take end-user requests for new cloud applications and make recommendations on services to use for optimal performance and scale as well as provision, capacity, monitor and adjust as appropriate. This role requires communicating and coordinating with vendors.</li><li>Cloud Administrators use the Azure Portal and as they become more proficient, they use PowerShell and the Command Line Interface.</li><li>Successful Cloud Administrators start this role with experience on operating systems, virtualization, cloud infrastructure, storage structures, and networking.</li></ul><h2 id="about-this-course-prerequisites" tabindex="-1">About this Course: Prerequisites <a class="header-anchor" href="#about-this-course-prerequisites" aria-label="Permalink to &quot;About this Course: Prerequisites&quot;">​</a></h2><p>Successful Azure Adminstrators start this role with experience on operating systems, virtualization, clolud infrastructure, storage structures, and networking.</p><ul><li>Understanding of on-premises virtualization technologies, including: VMs, virtual networking, and virtual hard disks.</li><li>Understanding of network configuration, including TCP/IP, Domain Name System (DNS), virtual private networks (VPNs), firewalls, and encryption technologies.</li><li>Understanding of Active Directory concepts, such as users, groups, and role-based access control.</li><li>Understanding of resilience and disaster recovery, including backup and restore operations.</li></ul><table><thead><tr><th style="text-align:center;">Study Areas</th><th style="text-align:center;">Weights</th></tr></thead><tbody><tr><td style="text-align:center;">Manage Azure identities and governance</td><td style="text-align:center;">15-20%</td></tr><tr><td style="text-align:center;">Implement and manage storage</td><td style="text-align:center;">10-15%</td></tr><tr><td style="text-align:center;">Deploy and manage Azure compute resources</td><td style="text-align:center;">25-30%</td></tr><tr><td style="text-align:center;">Configure and manage virtual networking</td><td style="text-align:center;">30-35%</td></tr><tr><td style="text-align:center;">Monitor and backup resources</td><td style="text-align:center;">10-15%</td></tr></tbody></table><h2 id="module-01-identity" tabindex="-1">Module 01: Identity <a class="header-anchor" href="#module-01-identity" aria-label="Permalink to &quot;Module 01: Identity&quot;">​</a></h2><h3 id="azure-active-directory-overview" tabindex="-1">Azure Active Directory Overview <a class="header-anchor" href="#azure-active-directory-overview" aria-label="Permalink to &quot;Azure Active Directory Overview&quot;">​</a></h3><ul><li>Azure Active Directory</li><li>Azure AD Concepts</li><li>Azure Active Directory Editions</li><li>Multi-Factor Authentication</li></ul><h4 id="azure-active-directory" tabindex="-1">Azure Active Directory <a class="header-anchor" href="#azure-active-directory" aria-label="Permalink to &quot;Azure Active Directory&quot;">​</a></h4><p><img src="/codespacex/devops/azure/k_01.jpg" alt="image"></p><ul><li>A cloud-based suite of identity management capabilities that enables you to securely manage access to Azure services and resources for your users.</li><li>Provides application management, authentication, device management, and hybrid identity.</li></ul><h4 id="azure-ad-concepts" tabindex="-1">Azure AD Concepts <a class="header-anchor" href="#azure-ad-concepts" aria-label="Permalink to &quot;Azure AD Concepts&quot;">​</a></h4><table><thead><tr><th style="text-align:center;">Concept</th><th style="text-align:center;">Description</th></tr></thead><tbody><tr><td style="text-align:center;">Identity</td><td style="text-align:center;">An object that can be authenticated.</td></tr><tr><td style="text-align:center;">Account</td><td style="text-align:center;">An identity that has data associated with it.</td></tr><tr><td style="text-align:center;">Azure AD Account</td><td style="text-align:center;">An identity created through Azure AD or another Microsoft cloud service.</td></tr><tr><td style="text-align:center;">Azure tenant</td><td style="text-align:center;">A dedicated and trusted instance of Azure AD that&#39;s automatically created when your organization signs up for a Microsoft cloud service subscription.</td></tr><tr><td style="text-align:center;">Azure AD directory</td><td style="text-align:center;">Each Azure tenant has a dedicated and trusted Azure AD directory.</td></tr><tr><td style="text-align:center;">User subscription</td><td style="text-align:center;">Used to pay for Azure cloud services.</td></tr></tbody></table><h4 id="azure-active-directory-editions" tabindex="-1">Azure Active Directory Editions <a class="header-anchor" href="#azure-active-directory-editions" aria-label="Permalink to &quot;Azure Active Directory Editions&quot;">​</a></h4><table><thead><tr><th style="text-align:center;">No object limit</th><th style="text-align:center;">Free</th><th style="text-align:center;">Office 365 Apps</th><th style="text-align:center;">Premium P1</th><th style="text-align:center;">Premium P2</th></tr></thead><tbody><tr><td style="text-align:center;">Directory Objects</td><td style="text-align:center;">500,000 objects</td><td style="text-align:center;">No object limit</td><td style="text-align:center;">No object limit</td><td style="text-align:center;">No object limit</td></tr><tr><td style="text-align:center;">Single Sign-On</td><td style="text-align:center;">Up to 10 apps</td><td style="text-align:center;">Up to 10 apps</td><td style="text-align:center;">Unlimited</td><td style="text-align:center;">Unlimited</td></tr><tr><td style="text-align:center;">Core Identity and Access</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">B2B Collaboration</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">Identity &amp; Access for O365</td><td style="text-align:center;"></td><td style="text-align:center;">X</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">Premium Features</td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;">X</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">Hybrid Identities</td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;">X</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">Advanced Group Access</td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;">X</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">Conditional Access</td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;">X</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">Identity Protection</td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">Identity Governance</td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;">X</td></tr></tbody></table><h4 id="multi-factor-authentication" tabindex="-1">Multi-Factor Authentication <a class="header-anchor" href="#multi-factor-authentication" aria-label="Permalink to &quot;Multi-Factor Authentication&quot;">​</a></h4><p><img src="/codespacex/devops/azure/k_02.jpg" alt="image"></p><ul><li>Provides two step authentication verification</li><li>Lets you enforce controls on access to access to apps based on specific conditions</li></ul><h3 id="users-and-groups-overview" tabindex="-1">Users and Groups Overview <a class="header-anchor" href="#users-and-groups-overview" aria-label="Permalink to &quot;Users and Groups Overview&quot;">​</a></h3><ul><li>User Accounts</li><li>Managing User Accounts</li><li>Bulk User Accounts</li><li>Group Accounts</li><li>Azure AD Connect</li><li>Azure AD Connect Health</li><li>Azure AD B2B and B2C</li><li>Demonstration - Users and Groups</li></ul><h4 id="user-accounts" tabindex="-1">User Accounts <a class="header-anchor" href="#user-accounts" aria-label="Permalink to &quot;User Accounts&quot;">​</a></h4><p><img src="/codespacex/devops/azure/k_03.jpg" alt="image"></p><ul><li>All users must have an account</li><li>The account is used for authentication and authorization</li><li>Identity Sources: Cloud, Directory-synchronized, and Guest</li></ul><h4 id="managing-user-accounts" tabindex="-1">Managing User Accounts <a class="header-anchor" href="#managing-user-accounts" aria-label="Permalink to &quot;Managing User Accounts&quot;">​</a></h4><ul><li>Must be Global Administrator or User Administrator to manage users</li><li>User profile (picture, job, contact info) is optional</li><li>Deleted users can be restored for 30 days</li><li>Sign in and audit log information is available</li></ul><h4 id="bulk-user-accounts" tabindex="-1">Bulk User Accounts <a class="header-anchor" href="#bulk-user-accounts" aria-label="Permalink to &quot;Bulk User Accounts&quot;">​</a></h4><ul><li>Create the comma-separated values (CSV) file with the list of all the users and their properties</li><li>Loop through the file processing each user</li><li>Consider error handling, duplicate users, initial password settings, empty properties, and when the account is enabled</li></ul><h4 id="group-accounts" tabindex="-1">Group Accounts <a class="header-anchor" href="#group-accounts" aria-label="Permalink to &quot;Group Accounts&quot;">​</a></h4><ul><li>Group Types <ul><li>Security groups</li><li>Office 365 groups</li></ul></li><li>Assignment Types <ul><li>Assigned</li><li>Dynamic User</li><li>Dynamic Device (Security groups only)</li></ul></li></ul><h4 id="azure-ad-connect" tabindex="-1">Azure AD Connect <a class="header-anchor" href="#azure-ad-connect" aria-label="Permalink to &quot;Azure AD Connect&quot;">​</a></h4><p><img src="/codespacex/devops/azure/k_04.jpg" alt="image"></p><ul><li>Integrate your on-premises directories with Azure Active Directory</li><li>Provides a common identity for your users for Office 365, Azure, and SaaS applications integrated with Azure AD</li><li>There are serveral authentication options - password hash synchronization and pass-through authentication</li></ul><h4 id="azure-ad-connect-health" tabindex="-1">Azure AD Connect Health <a class="header-anchor" href="#azure-ad-connect-health" aria-label="Permalink to &quot;Azure AD Connect Health&quot;">​</a></h4><p><img src="/codespacex/devops/azure/k_05.jpg" alt="image"></p><ul><li>Monitor and gain insights into AD FS servers, Azure AD Connect, and AD domain controllers</li><li>Monitor and gain insights into the snchronizations that occur between your on-premises AD DS and Azure AD</li><li>Monitor and gain insights into your on-premises identity infrastructure that is used to access Office 365 or other Azure AD applications</li></ul><h4 id="azure-ad-b2b-and-b2c" tabindex="-1">Azure AD B2B and B2C <a class="header-anchor" href="#azure-ad-b2b-and-b2c" aria-label="Permalink to &quot;Azure AD B2B and B2C&quot;">​</a></h4><ul><li>Business to Business (B2B) <ul><li>Inviting users from other Azure AD Tenants into your own organization tenant</li><li>User provisioning is done by the invited party</li></ul></li><li>Business to Customer (B2C) <ul><li>Inviting users from other social media Identity Tenants into your own organization tenant</li><li>User provisioning is down by the invited party; you are in control to invite the other side&#39;s users</li></ul></li></ul><h2 id="module-02-governance-and-compliance" tabindex="-1">Module 02: Governance and Compliance <a class="header-anchor" href="#module-02-governance-and-compliance" aria-label="Permalink to &quot;Module 02: Governance and Compliance&quot;">​</a></h2><h3 id="subscriptions-and-accounts-overview" tabindex="-1">Subscriptions and Accounts Overview <a class="header-anchor" href="#subscriptions-and-accounts-overview" aria-label="Permalink to &quot;Subscriptions and Accounts Overview&quot;">​</a></h3><ul><li>Regions</li><li>Azure Subscriptions</li><li>Getting a Subscription</li><li>Subscription Usage</li><li>Cost Management</li><li>Resource Tags</li><li>Cost Savings</li></ul><h4 id="regions" tabindex="-1">Regions <a class="header-anchor" href="#regions" aria-label="Permalink to &quot;Regions&quot;">​</a></h4><ul><li>Aregion represents a collection of datacenters</li><li>Provides flexibility and scale</li><li>Preserves data residency</li><li>Select regions close to your users</li><li>Be aware of region deployment availability</li><li>There are global services that are region independent</li><li>Regions are paired for gigh availability</li></ul><h4 id="azure-subscriptions" tabindex="-1">Azure Subscriptions <a class="header-anchor" href="#azure-subscriptions" aria-label="Permalink to &quot;Azure Subscriptions&quot;">​</a></h4><p><img src="/codespacex/devops/azure/k_06.jpg" alt="image"></p><ul><li>Logical unit of Azure services that is linked to an Azure account</li><li>Security and billing boundary</li><li>Includes accounts - identities in Azure Active Directory (Azure AD) or in a directory that is trusted by Azure AD, such as a work or school organization.</li></ul><h5 id="getting-a-subscription" tabindex="-1">Getting a Subscription <a class="header-anchor" href="#getting-a-subscription" aria-label="Permalink to &quot;Getting a Subscription&quot;">​</a></h5><ul><li>Enterprise Agreement customers make an upfront monetary commitment and consume services throughout the yaer</li><li>Resellers provide a simple, flexible eay to purchase cloud services</li><li>Partners can design and implement your Azure cloud solution</li><li>Personal free account - start right away</li></ul><h4 id="cost-management" tabindex="-1">Cost Management <a class="header-anchor" href="#cost-management" aria-label="Permalink to &quot;Cost Management&quot;">​</a></h4><ul><li>Conduct cost analysis</li><li>Create a budget</li><li>Review recommendations</li><li>Export the data</li></ul><h4 id="resource-tags" tabindex="-1">Resource Tags <a class="header-anchor" href="#resource-tags" aria-label="Permalink to &quot;Resource Tags&quot;">​</a></h4><p><img src="/codespacex/devops/azure/k_07.jpg" alt="image"></p><ul><li>Provides metadata for your Azure resources</li><li>Logically organizes resources into a taxonomy</li><li>Consists of a name-value pair</li><li>Very useful for rolling up billing information</li></ul><h4 id="cost-savings" tabindex="-1">Cost Savings <a class="header-anchor" href="#cost-savings" aria-label="Permalink to &quot;Cost Savings&quot;">​</a></h4><p><img src="/codespacex/devops/azure/k_08.jpg" alt="image"></p><ul><li>Azure Reservations - helps you save money by pre-paying for services</li><li>Azure Hybrid Benefits - use Windows Server and SQL Server on-premises licenses with Software Assurance</li><li>Azure Credits - monthly credit benefit that allows you to experiment with, develop, and test new solutions on Azure</li><li>Regions - Choose low-cost locations and regions</li></ul><h3 id="azure-policy-overview" tabindex="-1">Azure Policy Overview <a class="header-anchor" href="#azure-policy-overview" aria-label="Permalink to &quot;Azure Policy Overview&quot;">​</a></h3><ul><li>Management Groups</li><li>Creating Management Groups</li><li>Azure Policy</li><li>Implementing Azure Policy</li><li>Policy Definitions</li><li>Create Initiative Definitions</li><li>Scope the Initiative Definition</li><li>Determine Compliance</li></ul><h4 id="management-groups" tabindex="-1">Management Groups <a class="header-anchor" href="#management-groups" aria-label="Permalink to &quot;Management Groups&quot;">​</a></h4><p><img src="/codespacex/devops/azure/k_09.jpg" alt="image"></p><ul><li>Provides a level of scope above subscriptions</li><li>Targeting of policies and spend budgets across subscriptions and inheritance down the hierarchies</li><li>Compliance and cost reporting by organization (business/teams)</li></ul><h5 id="creating-management-groups" tabindex="-1">Creating Management Groups <a class="header-anchor" href="#creating-management-groups" aria-label="Permalink to &quot;Creating Management Groups&quot;">​</a></h5><ul><li>The <strong>Manahement Group ID</strong> is the directory unique identifier that is used to submit commands on this management group</li><li>The Display Name field is the name that is displayed within the Azure potal</li></ul><h4 id="azure-policy" tabindex="-1">Azure Policy <a class="header-anchor" href="#azure-policy" aria-label="Permalink to &quot;Azure Policy&quot;">​</a></h4><table><thead><tr><th>Usage Cases</th></tr></thead><tbody><tr><td><strong>Allowed resource types</strong> - Specify the resource types that your organization can deploy.</td></tr><tr><td><strong>Allowed virtual machine SKUs</strong> - Specify a set of virtual machine SKUs that your organization can deploy.</td></tr><tr><td><strong>Allowed locations</strong> - Restrict the locations your organization can specify when deploying resources.</td></tr><tr><td><strong>Require tag and its value</strong> - Enforces a required tag and its value.</td></tr><tr><td><strong>Azure Backup should be enabled for Virtual Machines</strong> - Audit if Azure Backup service is enabled for all Virtual machines.</td></tr></tbody></table><ul><li>Azure Policy is a service in Azure that you use to create, assign and, manage policies</li><li>Azure Policy runs evaluations and scans for non-compliant resources</li><li>Advantages: <ul><li>Enforcement and compliance</li><li>Apply policies at scale</li><li>Remediation</li></ul></li></ul><h5 id="implementing-azure-policy" tabindex="-1">Implementing Azure Policy <a class="header-anchor" href="#implementing-azure-policy" aria-label="Permalink to &quot;Implementing Azure Policy&quot;">​</a></h5><p><img src="/codespacex/devops/azure/k_10.jpg" alt="image"></p><ol><li>Browse Policy Definitions</li><li>Create Initiative Definitions</li><li>Scope the Initiative Definition</li><li>View Policy evaluation results</li></ol><h3 id="role-based-access-control-overview" tabindex="-1">Role-Based Access Control Overview <a class="header-anchor" href="#role-based-access-control-overview" aria-label="Permalink to &quot;Role-Based Access Control Overview&quot;">​</a></h3><ul><li>Role-Based Access Control</li><li>Azure RBAC Roles vs Azure AD Administrator Roles</li><li>RBAC Authentication</li><li>Azure RBAC Roles</li></ul><h4 id="role-based-access-control" tabindex="-1">Role-Based Access Control <a class="header-anchor" href="#role-based-access-control" aria-label="Permalink to &quot;Role-Based Access Control&quot;">​</a></h4><ul><li>Provides fine-grained access management of resources in Azure <ul><li>Built on Azure Resource Manager</li><li>Segregate duties within your team</li><li>Grant only the amount of access to users that they need to perform their jobs</li></ul></li><li>Concepts <ul><li><strong>Security principal</strong>. Object that represents something that us requesting access to resources</li><li><strong>Role definition</strong>. Collection of permissions that lists the operations that can be performed</li><li><strong>Scope</strong>. Boundary for the level of access that is requested</li><li><strong>Assignment</strong>. Attaching a role definition to a security principal at a particular scope <ul><li>Users can grant access described in a role definition by creating an assignment</li></ul></li></ul></li></ul><h4 id="azure-rbac-roles-vs-azure-ad-administrator-roles" tabindex="-1">Azure RBAC Roles vs Azure AD Administrator Roles <a class="header-anchor" href="#azure-rbac-roles-vs-azure-ad-administrator-roles" aria-label="Permalink to &quot;Azure RBAC Roles vs Azure AD Administrator Roles&quot;">​</a></h4><p>Azure and Azure AD offer two types of RBAC roles</p><table><thead><tr><th style="text-align:center;">Azure RBAC roles</th><th style="text-align:center;">Azure AD roles</th></tr></thead><tbody><tr><td style="text-align:center;">Manage access to Azure resources</td><td style="text-align:center;">Manage access to Azure AD objects</td></tr><tr><td style="text-align:center;">Scope can be specified at multiple levels</td><td style="text-align:center;">Scope is at the tenant level</td></tr><tr><td style="text-align:center;">Role information can be accessed in the Azure portal, Azure CLI, Azure PowerShell, Azure Resource Manager templates, REST API</td><td style="text-align:center;">Role information can be accessed in Azure portal, Office 365 admin portal, Microsoft Graph, Azure Active Directory PowerShell for Graph</td></tr></tbody></table><p><img src="/codespacex/devops/azure/k_11.jpg" alt="image"></p><h4 id="azure-rbac-roles" tabindex="-1">Azure RBAC Roles <a class="header-anchor" href="#azure-rbac-roles" aria-label="Permalink to &quot;Azure RBAC Roles&quot;">​</a></h4><table><thead><tr><th style="text-align:center;">RABC role in Azure</th><th style="text-align:center;">Permissions</th><th style="text-align:center;">Notes</th></tr></thead><tbody><tr><td style="text-align:center;">Owner</td><td style="text-align:center;">Has full access to all resources and can delegate access to others.</td><td style="text-align:center;">The Service Administrator and Co-Administrators are assigned the Owner role at the subscription scope. This applies to all resource types.</td></tr><tr><td style="text-align:center;">Contributor</td><td style="text-align:center;">Creates and manages all types of Azure resources but cannot grant access to others.</td><td style="text-align:center;">This applies to all resource types.</td></tr><tr><td style="text-align:center;">Reader</td><td style="text-align:center;">View Azure resources.</td><td style="text-align:center;">This applies to all resource types.</td></tr><tr><td style="text-align:center;">User Access Administrator</td><td style="text-align:center;">Manages user access to Azure resources.</td><td style="text-align:center;">This applies to managing access, rather than to managing resources.</td></tr><tr><td style="text-align:center;">.</td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr></tbody></table><h2 id="module-03-azure-administration" tabindex="-1">Module 03: Azure Administration <a class="header-anchor" href="#module-03-azure-administration" aria-label="Permalink to &quot;Module 03: Azure Administration&quot;">​</a></h2><h2 id="module-04-virtual-networking" tabindex="-1">Module 04: Virtual Networking <a class="header-anchor" href="#module-04-virtual-networking" aria-label="Permalink to &quot;Module 04: Virtual Networking&quot;">​</a></h2><h2 id="module-05-intersite-connectivity" tabindex="-1">Module 05: Intersite Connectivity <a class="header-anchor" href="#module-05-intersite-connectivity" aria-label="Permalink to &quot;Module 05: Intersite Connectivity&quot;">​</a></h2><h2 id="module-06-network-traffic-management" tabindex="-1">Module 06: Network Traffic Management <a class="header-anchor" href="#module-06-network-traffic-management" aria-label="Permalink to &quot;Module 06: Network Traffic Management&quot;">​</a></h2><h2 id="module-07-azure-storage" tabindex="-1">Module 07: Azure Storage <a class="header-anchor" href="#module-07-azure-storage" aria-label="Permalink to &quot;Module 07: Azure Storage&quot;">​</a></h2><h2 id="module-08-azure-virtual-machines" tabindex="-1">Module 08: Azure Virtual Machines <a class="header-anchor" href="#module-08-azure-virtual-machines" aria-label="Permalink to &quot;Module 08: Azure Virtual Machines&quot;">​</a></h2><h2 id="module-09-serverless-computing" tabindex="-1">Module 09: Serverless Computing <a class="header-anchor" href="#module-09-serverless-computing" aria-label="Permalink to &quot;Module 09: Serverless Computing&quot;">​</a></h2><h2 id="module-10-data-protection" tabindex="-1">Module 10: Data Protection <a class="header-anchor" href="#module-10-data-protection" aria-label="Permalink to &quot;Module 10: Data Protection&quot;">​</a></h2><h2 id="module-11-monitoring" tabindex="-1">Module 11: Monitoring <a class="header-anchor" href="#module-11-monitoring" aria-label="Permalink to &quot;Module 11: Monitoring&quot;">​</a></h2>',89)];const o=e(n,[["render",function(e,i,r,n,o,s){return t(),a("div",null,l)}]]);export{r as __pageData,o as default};