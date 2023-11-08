# Azure 104 Preparation

## Documentation

- [Azure 104 exam](https://www.examtopics.com/exams/microsoft/az-104/view/)

- [Azure docs](https://learn.microsoft.com/en-us/azure/?product=popular)

- [Azure 104 learn path](https://learn.microsoft.com/en-us/credentials/certifications/exams/az-104/)

## Topic 2

### Virtual Network

#### Scenario least privilege role for manage load balancer

You have an Azure subscription named Subscription1 that contains a resource group named RG1. In RG1, you create an internal load balancer named LB1 and a public load balancer named LB2. You need to ensure that an administrator named Admin1 can manage LB1 and LB2. The solution must follow the principle of least privilege.

Which role should you assign to Admin1 for each task?

- Task 1: To add a backend pool to LB1:
  - A. Contributor on LB1
  - B. Network Contributor on LB1
  - C. Network Contributor on RG1
  - D. Owner on LB1
- Task 2: To add a health probe to LB2:
  - A. Contributor on LB2
  - B. Network Contributor on LB2
  - C. Network Contributor on RG1
  - D. Owner on LB2

**Correct Solution**:

- Task 1: Network Contributor on LB1.
- Task 2: Network Contributor on LB2.

- **Explanation**:

[Reference](https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles)

There is something that we all seem to be forgetting here..and that is that Azure RBAC roles can be applied at three different scopes...management group, subscription, resource group and finally resource. So, LB1 and LB2 are resources that we want the Network Contributor role to manage, which by the way satisfies the principle of least privilege. When you apply the scope to the resource group, then it is applied to all the resources in the resource group which is not what we want. The question specifically referred to LB1 and LB2. These resources are atomic, therefore applying the scope to the two will affect just those two resources.

#### Scenario Architecture for point-to-site and site-to-siteVPN

You have an Azure subscription.

Users access the resources in the subscription from either home or from customer sites. From home, users must establish a point-to-site VPN to access the Azure resources. The users on the customer sites access the Azure resources by using site-to-site VPNs.

You have a line-of-business-app named App1 that runs on several Azure virtual machine. The virtual machines run Windows Server 2016.

You need to ensure that the connections to App1 are spread across all the virtual machines.

What are two possible Azure services that you can use? Each correct answer presents a complete solution.

- A. an internal load balancer
- B. a public load balancer
- C. an Azure Content Delivery Network (CDN)
- D. Traffic Manager
- E. an Azure Application Gateway

**Correct Solution**: A, E

- **Explanation**:

Network traffic from the VPN gateway is routed to the cloud application through an internal load balancer. The load balancer is located in the front-end subnet of the application.

[Reference vpn](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/hybrid-networking/vpn)

[Reference load-balancer-overview](https://docs.microsoft.com/en-us/azure/load-balancer/load-balancer-overview)

[Reference application-gateway](https://docs.microsoft.com/en-us/azure/application-gateway/overview)

A: The customer sites are connected through VPNs, so an internal load balancer is enough.

B: The customer sites are connected through VPNs, so there's no need for a public load balancer, an internal load balancer is enough.

C: A CDN does not provide load balancing for applications, so it not relevant for this situation.

D: Traffic manager is a DNS based solution to direct users' requests to the nearest (typically) instance and does not provide load balancing for this situation.

E: Azure Application Gateway is a valid option, as it provides load balancing in addition to routing and security functions

#### Scenario Move resource to other region

You have an Azure subscription named Subscription1. Subscription1 contains the resource groups in the following table.

| Name | Azure region   | Policy  |
| ---- | -------------- | ------- |
| RG1  | West Europe    | Policy1 |
| RG2  | North Europe   | Policy2 |
| RG3  | France Central | Policy3 |

RG1 has a web app named WebApp1. WebApp1 is located in West Europe. You move WebApp1 to RG2.

What is the effect of the move?

- A. The App Service plan for WebApp1 remains in West Europe. Policy2 applies to WebApp1.
- B. The App Service plan for WebApp1 moves to North Europe. Policy2 applies to WebApp1.
- C. The App Service plan for WebApp1 remains in West Europe. Policy1 applies to WebApp1.
- D. The App Service plan for WebApp1 moves to North Europe. Policy1 applies to WebApp1.

**Correct Solution**: A

- **Explanation**:

You can move an app to another App Service plan, as long as the source plan and the target plan are in the same resource group and geographical region.

The region in which your app runs is the region of the App Service plan it's in. However, you cannot change an App Service plan's region.

You can only move a resource to a Resource Group or Subscription, but the location stays the same. When you move WebApp1 to RG2, the resource will be restricted based on the policy of the new Resource Group (Policy2).

[Reference app-service-plan-manage](https://docs.microsoft.com/en-us/azure/app-service/app-service-plan-manage)

### Azure Kubernetes Service (AKS)

#### Scenario Azure AD with AKS

You have an Azure subscription that contains an Azure Active Directory (Azure AD) tenant named contoso.com and an Azure Kubernetes Service (AKS) cluster named AKS1.

An administrator reports that she is unable togrant access to AKS1 to the users in contoso.com users.

What should you do first?

- A. From contoso,com, modify the Organization relationships settings.
- B. From contoso.com, create an OAuth 2.0 authorization endpoint.
- C. Recreate AKS1.
- D. From AKS1, create a namespace.

**Correct Solution**:

- B. From contoso.com, create an OAuth 2.0 authorization endpoint.

- **Explanation**:

Cluster administrators can configure Kubernetes role-based access control (Kubernetes RBAC) based on a user's identity or directory group membership. Azure AD authentication is provided to AKS clusters with OpenID Connect. OpenID Connect is an identity layer built on top of the OAuth 2.0 protocol.

[Reference managed - azure - ad](https://learn.microsoft.com/en-us/azure/aks/managed-azure-ad)

[Reference Kubernetes Authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)

### Microsoft 365

#### Microsoft 365 and Azure Active Directory

You have a Microsoft 365 tenant and an Azure Active Directory (Azure AD) tenant named contoso.com. You plan to grant three users named User1, User2, and User3 access to a temporary Microsoft SharePoint document library named Library1. You need to create groups for the users. The solution must ensure that the groups are deleted automatically after 180 days.

Which two groupos should you create? Each correct answer presents a complete solution.

- A. a Microsoft 365 group that uses the Assigned membership type.
- B. a Security group that uses the Assigned membership type.
- C. a Microsoft 365 group that uses the Dynamic User membership type.
- D. a Security group that uses the Dynamic User membership type.
- E. a Security group that uses the Dynamic Device membership type.

**Correct Solution**: A,C

- **Explanation**:

You can set expiration policy only for Office 365 groups in Azure Active Directory (Azure AD).

Note: With the increse in usage of Office 365 groups, administrations and users need a way to clean up unused groups. Expiration policies can help remove inactive groups from the system and make things cleaner.

When a group expires, all of its associated services (the mailbox, Planner, SharePoint site, etc.) are also deleted. You can set up a rule for dynamic membership on security groups or Office 365 groups.

[Reference office 365 groups expiration policy](https://docs.microsoft.com/en-us/office365/admin/create-groups/office-365-groups-expiration-policy?view=o365-worldwide)

### Azure AD

#### Scenario move resource

You have an Azure subscription named AZPT1 that conatins the resources shown in the following table:

| Name       | Type                                                 |
| ---------- | ---------------------------------------------------- |
| storage1   | Azure Storage account                                |
| VNET1      | Virtual network                                      |
| VM1        | Azure virtual machine                                |
| VM1Managed | Managed disk for VM1                                 |
| RVAULT1    | Recovery Services vault for the site recovery of VM1 |

You create a new Azure subscription named AZPT2.

You need to identify which resources can be moved to AZPT2.

Which resources should you identify?

- A. VM1, storage1, VNET1, and VM1Managed only
- B. VM1 and V,1Managed only
- C. VM1, storage1, VNET1, VM1Managed, and RVAULT1
- D. RVAULT1 only

**Correct Solution**: C

- **Explanation**:

You can move a VM and its associated resources to a different subscription by using the Azure portal.
You can now move an Azure Recovery Service (ASR) Vault to either a new resource group within the current subscription or to a new subscription.

[Reference](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription)

For a move across subscriptions, the resource and its dependent resources must be located in the same resource group and they must be moved together. For example, a VM with managed disks would require the VM and the managed disks to be moved together, along with other dependent resources.

If you're moving a resource to a new subscription, check to see whether the resource has any dependent resources, and whether they're located in the same resource group. If the resources aren't in the same resource group, check to see whether the resources can be combined into the same resource group. If so, bring all these resources into the same resource group by using a move operation across resource groups.

#### Scenario Configure programmatic deployment for the Marketplace

You recently created a new Azure subscription that contains a user named Admin1.
Admin1 attempts to deploy an Azure Marketplace resource by using an Azure Resource Manager template. Admin1 deploys the template by using Azure
PowerShell and receives the following error message: User failed validation to purchase resources. Error message: `Legal terms have not been accepted for this item on this subscription. To accept legal terms, please go to the Azure portal (http://go.microsoft.com/fwlink/?LinkId=534873) and configure programmatic deployment for the Marketplace item or create it there for the first time.`

You need to ensure that Admin1 can deploy the Marketplace resource successfully.

What should you do?

- A. From Azure PowerShell, run the Set-AzApiManagementSubscription cmdlet
- B. From the Azure portal, register the Microsoft.Marketplace resource provider
- C. From Azure PowerShell, run the Set-AzMarketplaceTerms cmdlet
- D. From the Azure portal, assign the Billing administrator role to Admin1

**Correct Solution**: C

- **Explanation**:

[Reference Set-AzMarketplaceTerms](https://docs.microsoft.com/en-us/powershell/module/Az.MarketplaceOrdering/Set-AzMarketplaceTerms?view=azps-4.6.0)

#### Scenario assign administrative role

You have an Azure Active Directory (Azure AD) tenant that contains 5,000 user accounts.
You create a new user account named AdminUser1.
You need to assign the User administrator administrative role to AdminUser1.
What should you do from the user account properties?

- A. From the Licenses blade, assign a new license
- B. From the Directory role blade, modify the directory role
- C. From the Groups blade, invite the user account to a new group

**Correct Solution**: B

- **Explanation**:

Assign a role to a user -

1. Sign in to the Azure portal with an account that's a global admin or privileged role admin for the directory.
2. Select Azure Active Directory, select Users, and then select a specific user from the list.
3. For the selected user, select Directory role, select Add role, and then pick the appropriate admin roles from the Directory roles list, such as Conditional access administrator.
4. Press Select to save.

Active Directory -> Manage Section -> Roles and administrators-> Search for Admin and assign a user to it.

[Reference active-directory-users-assign-role-azure-portal](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-users-assign-role-azure-portal)

#### Scenario assign licenses

You have an Azure Active Directory (Azure AD) tenant named contoso.onmicrosoft.com that contains 100 user accounts.
You purchase 10 Azure AD Premium P2 licenses for the tenant.
You need to ensure that 10 users can use all the Azure AD Premium features.

What should you do?

- A. From the Licenses blade of Azure AD, assign a license
- B. From the Groups blade of each user, invite the users to a group
- C. From the Azure AD domain, add an enterprise application
- D. From the Directory role blade of each user, modify the directory role

**Correct Solution**: A

- **Explanation**:

Active Directory-> Manage Section > Choose Licenses -> All Products -> Select Azure Active Directory Premium P2 -> Then assign a user to it.

[Reference license-users-groups](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/license-users-groups)

#### Scenario on-premises service manage VM

You have an Azure subscription named Subscription1 and an on-premises deployment of Microsoft System Center Service Manager.
Subscription1 contains a virtual machine named VM1.
You need to ensure that an alert is set in Service Manager when the amount of available memory on VM1 is below 10 percent.

What should you do first?

- A. Create an automation runbook
- B. Deploy a function app
- C. Deploy the IT Service Management Connector (ITSM)
- D. Create a notification

**Correct Solution**: C

- **Explanation**:

The IT Service Management Connector (ITSMC) allows you to connect Azure and a supported IT Service Management (ITSM) product/service, such as the
Microsoft System Center Service Manager.
With ITSMC, you can create work items in ITSM tool, based on your Azure alerts (metric alerts, Activity Log alerts and Log Analytics alerts).

IT Service Management Connector (ITSMC) allows you to connecy Azure to a supported IT Service Management (ITSM) product or service. Azure services like Azure Log Analytics and Azure monitor provide tools to detect, analyze, and trobleshoot problems with your Azure and non-Azure resources. But the work items related to an issue typically reside in an ITSM tools to help yopu resolve issues faster. ITSMC supports connections with the following ITSM tools: ServiceNow, System Center Service Manager, Provance, Cherwell.

[Reference itsmc](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/itsmc-overview)

#### Scenario assign an administrator on all computers

You sign up for Azure Active Directory (Azure AD) Premium P2.
You need to add a user named admin1@contoso.com as an administrator on all the computers that will be joined to the Azure AD domain.

What should you configure in Azure AD?

- A. Device settings from the Devices blade
- B. Providers from the MFA Server blade
- C. User settings from the Users blade
- D. General settings from the Groups blade

**Correct Solution**: A

- **Explanation**:

When you connect a Windows device with Azure AD using an Azure AD join, Azure AD adds the following security principles to the local administrators group on the device:

✑ The Azure AD global administrator role

✑ The Azure AD device administrator role

✑ The user performing the Azure AD join

In the Azure portal, you can manage the device administrator role on the Devices page. To open the Devices page:

1. Sign in to your Azure portal as a global administrator or device administrator.
2. On the left navbar, click Azure Active Directory.
3. In the Manage section, click Devices.
4. On the Devices page, click Device settings.
5. To modify the device administrator role, configure Additional local administrators on Azure AD joined devices.

[Reference assign-local-admin](https://docs.microsoft.com/en-us/azure/active-directory/devices/assign-local-admin)

#### Scenario verify the domain name

You have an Azure Active Directory (Azure AD) tenant named contosocloud.onmicrosoft.com. Your company has a public DNS zone for contoso.com. You add contoso.com as a custome domain name to Azure AD. You need to ensure that Azure can verify the domain name.

Which type of DNS record should you create?

- A. MX
- B. NSEC
- C. PTR
- D. RRSIG

**Correct Solution**: A

- **Explanation**:

To verify your custom domain name (example)

1. Sign in to the Azure portal using a Global administrator account for the directory.
2. Select Azure Active Directory, and then select Custom domain names.
3. On the Fabrikam - Custom domain names page, select the custom domain is properly registered and is valid for Azure AD. Use either the TXT or the MX record type.

[Reference dns-web-sites-custom-domain](https://docs.microsoft.com/en-us/azure/dns/dns-web-sites-custom-domain)

#### Scenario create Azure logic apps in resource group

You have an Azure Directory (Azure AD) tenant named Adatum and an Azure Subscription named Subscription1. Adatum contains a group named Developers. Subscription1 contains a resource group named Dev.

You need to provide the Developers group with the ability to create Azure logic apps in the Dev resource group.

**Correct Solution**: On Dev, you assign the Contributor role to the Developers group.

- **Explanation**: The Contributor role can manage all resources (and add resources) in a Resource Group.

**Wrong Solution**:

- A: On Subscription1, you assign the DevTest Labs User role to the Developers group.

  - **Explanation**:
    DevTest Labs User role only lets you connect, start, restart, and shutdown virtual machines in your Azure DevTest Labs.

    The Logic App Contributor role lets you manage logic app, but not access to them. It provides access to view, edit, and update a logic app.

- B: On Subscription1, you assign the Logic App Operator role to the Developers group.

  - **Explanation**:

  You would need the Logic App Contributor role.

  [Reference role-based-access-control](https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles)

  [Reference logic-apps](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-securing-a-logic-app)

#### Scenario MFA config

You have an Azure Active Directory (Azure AD) tenant.
You need to create a conditional access policy that requires all users to use multi-factor authentication when they access the Azure portal.
Which three settings should you configure?

Assignments:

- A. Users and groups
- B. Cloud apps
- C. Conditions

Access controls:

- A. Grant
- B. Session

**Correct Solution**: Users and groups + Cloud apps + Grant

- **Explanation**:

  - Select Users & Groups : Where you have to choose all users.
  - Select Cloud apps or actions: to specify the Azure portal
  - Grant: to grant the MFA.

Those are the minimum requirements to create MFA policy. No conditions are required in the question.

[Reference concept-conditional-access-policies](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-policies)

#### Scenario Enable external partner invitation

You have an Azure Active Directory (Azure AD) tenant named contoso.onmicrosoft.com.
The User administrator role is assigned to a user named Admin1.
An external partner has a Microsoft account that uses the user1@outlook.com sign in.
Admin1 attempts to invite the external partner to sign in to the Azure AD tenant and receives the following error message: `Unable to invite user user1@outlook.com `" Generic authorization exception.`
You need to ensure that Admin1 can invite the external partner to sign in to the Azure AD tenant.
What should you do?

- A. From the users settings blade, modify the External collaboration settings.
- B. From the Custom domain names blade, add a custom domain.
- C. From the Organizational relationships blade, add an identity provider.
- D. From the Roles and administrators blade, assign the Security administrator role to Admin1.

**Correct Solution**: A

- **Explanation**:
  Go to Azure AD--users--user settings --scroll down.--External users
  Manage external collaboration settings

### Azure Virtual Network

#### Scenario assign the Reader role

You have an Azure subscription named Subscription1 that contains a virtual network named VNet1. VNet1 is in a resource group named RG1. Subscription1 has a user named User1. User1 has the following roles:

✑ Reader

✑ Security Admin

✑ Security Reader

You need to ensure that User1 can assign the Reader role for VNet1 to other users.

What should you do?

- A. Remove User1 from the Security Reader and Reader roles for Subscription1.
- B. Assign User1 the User Access Administrator role for VNet1.
- C. Assign User1 the Network Contributor role for VNet1.
- D. Assign User1 the Network Contributor role for RG1.

**Correct Solution**: B

- **Explanation**:
  Has full access to all resources including the right to delegate access to others.

Note:

There are several versions of this question in the exam. The question has two possible correct answers:

✑ Assign User1 the User Access Administrator role for VNet1.

✑ Assign User1 the Owner role for VNet1.

Other incorrect answer options you may see on the exam include the following:

✑ Assign User1 the Contributor role for VNet1.

✑ Remove User1 from the Security Reader and Reader roles for Subscription1. Assign User1 the Contributor role for Subscription1.

✑ Remove User1 from the Security Reader role for Subscription1. Assign User1 the Contributor role for RG1.

[Reference role-based-access-control](https://docs.microsoft.com/en-us/azure/role-based-access-control/overview)

#### Scenario Which role can assign a policy?

You have an Azure subscription linked to an Azure Active Directory tenant. The tenant includes a user account named User1.
You need to ensure that User1 can assign a policy to the tenant root management group.
What should you do?

- A. Assign the Owner role for the Azure Subscription to User1, and then modify the default conditional access policies.
- B. Assign the Owner role for the Azure subscription to User1, and then instruct User1 to configure access management for Azure resources.
- C. Assign the Global administrator role to User1, and then instruct User1 to configure access management for Azure resources. Most Voted
- D. Create a new management group and delegate User1 as the owner of the new management group.

**Correct Solution**: C

- **Explanation**:
  No one is given default access to the root management group. Azure AD Global Administrators are the only users that can elevate themselves to gain access. Once they have access to the root management group, the global administrators can assign any Azure role to other users to manage it.

  [Reference important-facts-about-the-root-management-group](https://docs.microsoft.com/en-us/azure/governance/management-groups/overview#important-facts-about-the-root-management-group)

  [Reference management-groups](https://docs.microsoft.com/en-us/azure/governance/management-groups/overview)

### Azure Analysis

#### Scenario cost analysis

You have an Azure subscription that is used by four departments in your company. The subscription contains 10 resource groups. Each department uses resources in several resource groups.

You need to send a report to the finance department. The report must detail the costs for each department.

Which three actions should you perform in sequence?

- A. Assign a tag to each resource group.
- B. Assign a tag to rach resource.
- C. Download the usage report.
- D. From the Cost analysis blade, filter the view by tag.
- E. Open the Resource costs blade of each resource group.

**Correct Solution**: assign a tag to rach resource -> From the Cost analysis blade, filter the view by tag -> Download the usage report

- **Explanation**:

[Reference resource-group-using-tags](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-using-tags)

[Reference billing-getting-started](https://docs.microsoft.com/en-us/azure/billing/billing-getting-started)

Box 1: Assign a tag to each resource.

You apply tags to your Azure resources giving metadata to logically organize them into a taxonomy. After you apply tags, you can retrieve all the resources in your subscription with that tag name and value. Each resource or resource group can have a maximum of 15 tag name/value pairs. Tags applied to the resource group are not inherited by the resources in that resource group.

Box 2: From the Cost analysis blade, filter the view by tag
After you get your services running, regularly check how much they're costing you. You can see the current spend and burn rate in Azure portal.

1. Visit the Subscriptions blade in Azure portal and select a subscription.
   You should see the cost breakdown and burn rate in the popup blade.
2. Click Cost analysis in the list to the left to see the cost breakdown by resource. Wait 24 hours after you add a service for the data to populate.
3. You can filter by different properties like tags, resource group, and timespan. Click Apply to confirm the filters and Download if you want to export the view to a Comma-Separated Values (.csv) file.

Box 3: Download the usage report

#### Scenario view the error events in Azure Log Analytics workspace

You have an Azure subscription named Subscription1 that contains an Azure Log Analytics workspace named Workspace1.

You need to view the error events from a table named Event.

Which query should you run in Workspace1?

- A. Get-Event Event | where {$\_.EventType == "error"}
- B. search in (Event) "error"
- C. select \* from Event where EventType == "error"
- D. search in (Event) \* | where EventType -eq "error"

**Correct Solution**: B

- **Explanation**:

To search a term in a specific table, add the table-name just after the search operator.

Note:

There are several versions of this question in the exam. The question has three possible correct answers:

1. Event|search "error"
2. Event|where EventType == "error"
3. search in (Event) "error"

Other incorrect answer options you may see on the exam include the following:

1. Get-Event Event | where {$\_.EventTye ג€"eq "error"}
2. Event | where EventType is "error"
3. search in (Event) \* | where EventType ג€"eq "error"
4. select \* from Event where EventType is "error"

[Reference search-queries](https://docs.microsoft.com/en-us/azure/azure-monitor/log-query/search-queries)

#### Scenario Advisor for managing cost

You have an Azure subscription. You have 100 Azure virtual machines. You need to quickly identify underutilized virtual machines that can have their service tier changed to a less expensive offering.

Which blade should you use?

- A. Monitor
- B. Advisor
- C. Metrics
- D. Customer insights

**Correct Solution**: B

- **Explanation**:
  Advisor helps you optimize and reduce your overall Azure spend by identifying idle and underutilized resources. You can get cost recommendations from the Cost tab on the Advisor dashboard.

  [Reference advisor-cost-recommendations](https://docs.microsoft.com/en-us/azure/advisor/advisor-cost-recommendations)
