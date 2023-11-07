# Azure 104 Preparation

## Documentation

- [Azure 104 exam](https://www.examtopics.com/exams/microsoft/az-104/view/7/)

- [Azure docs](https://learn.microsoft.com/en-us/azure/?product=popular)

- [Azure 104 learn path](https://learn.microsoft.com/en-us/credentials/certifications/exams/az-104/)

## Topic 1

### Azure Active Directory (Azure AD)

Microsoft Windows Azure Active Directory (Windows Azure AD or Azure AD) is a cloud service that provides administrators with the ability to manage end-user identities and access privileges. Its servies include core directory, access management and identity peotection.

The Azure AD now is [Microsoft Entra ID](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/whatis).

- Microsoft Entra ID is a cloud-based identity and access management service that enables your employees access external resources.

#### Scenario 1 for MEID

Your company has an Azure Acitive Directory (Azure AD) subscription.

You want to implement an Azure AD conditional access policy.

The policy must be configured to require members of the Global Administrators group to use Multi-Factor Authentication and Azure AD-joined device when they connect to Azure AD from untrusted locations.

**Wrong Solution**:

- A: You access the multi-factor authentication page to alter the user settings.

  - **Best Practice**:

    - The best way to enforce MFA is by Conditional Access.
    - The device has to be identified by Azure AD as a AD-joined device.
    - The trusted IP must be configured.

  - **Explanation**:

    - A: While accessing the multi-factor authentication page allows you to configure multi-fator authentication for users, it does not specifically target the members of the Global Administratoes group. To meet the goal of requiring Global Administrators to use Multi-Factor Authentication and an Azure AD-joined device when connecting from untrusted locations, you need to set up an Azure AD conditional access policy.

    - B: Given the requirements, you need to set up an Azure AD conditional access policy that enforces both Multi-Factor Authentication (MFA) and the use of Azure AD-joined devices for untrusted locations. The provided solution suggests accessing the multi-factor authentication page to alter user settings. This would allow you to enforce MFA, but it does not address the requirement for the use of Azure AD-joined devices when they connect from untrusted locations.

- B: You access the Azure portal to alter the session control of the Azure AD conditional access policy.

  - **Best Practice**:

    - [docs](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/howto-conditional-access-policy-all-users-mfa)
    - Under Access controls > Grant, select:
      - Grant access
      - Require multi-factor authentication
    - select `Select`

  - **Explanation**:
    You need to alter the grant control, not the session control.

#### Scenario 2 for MFA

Your company makes use of Multi-Factor Authentication for when users are not in the office. The Per Aucthentication option has been configured as the usage model. After the acquisition of a smaller business and the addition of the new staff to Azure Active Directory (Azure AD / Microsoft Entra ID) obtains a different commpany and adding the new employees to Azure Active Directory, you are informed that these employees should also make use of Multi-Factor Authentication.

To achieve this, the Per Enabled User setting must be set for the usage model.

**Wrong Solution**:

- A: You reconfigure the exsiting usage model via the Azure portal.

  - **Best Practice**:
    - Since it is not possible to change the usage model of an existing provider as it is right now, you have to create a new one and reactivate your existing server with activation credentials from the nre provider.
    - [reference](https://365lab.net/2015/04/11/switch-usage-model-in-azure-multi-factor-authentication-server/)
  - **Explanation**:
    You need to create a new Multi-Factor Authentication provider with a backup from the existing MFA provider data. You [cannnot change the usage model (per enabled user or per authentication) after an MFA provider is created](https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-mfa-authprovider).

- B: You reconfigure the existing usage model via the Azure CLI.
  - **Best Practice**: Same as above `A`.
  - **Explanation**: Same as above `A`.

#### Scenario 3 - Replicate user information

Your company has an Azure Active Directory (Azure AD) tenant named weyland.com that is configured for hybrid conexistence with the on-premises Active Directory domain.

You have a server named DirSync1 that is configured as a DirSync server.

You create a new user account in the on-premise Active Directory. You now need to replicate the user information to Azure AD **immediately**.

- **Correct Solution**: run `Start-ADSyncSyncCycle-PolicyType Delta`. Some [docs](https://learn.microsoft.com/en-us/azure/active-directory/hybrid/connect/how-to-connect-sync-feature-scheduler)

  - `Start-ADSyncSyncCycle-PolicyType Initial`: cross references everything in Local AD with Office 365 everytime.
  - `Start-ADSyncSyncCycle-PolicyType Delta`: only looks for changes since the last Initial.

**Wrong Solution**:

- A: You Run the `Start-ADSyncSyncCycle-PolicyType Initial` PowerShell cmdlet.

- B: You use Active Directory Sites and Services to force replication of the Global Catelog on a domain controller.

  - **Explanation**:

  The solution mentioned in the scenario, which is using Active Directory Sites and Services to force replication of the Global Catalog on a domain controller, will replicate the user information to other domain controllers in the same site, but it will not replicate the user information to Azure AD immediately. To replicated the user information to Azure AD immediately, you need to manually start a synchronization cycle on the DirSync server or wait for the next scheduled synchronization cycle to occur. Therefore, the solution does not meet the goal of replicating the user information to Azure AD immediately.

- C: You restart the NetLogon service on a domain controller.

  - **Best Practice**:

    If you need to manually run a sync cycle, then from PowerShell run `Start-ADSyncSyncCycle -PolicyType Delta`.

    To initiate a full sync cycle, run `Start-ADSyncSyncCycle -PolicyType Initial` from a PowerShell prompt.

    Running a full sync cycle can be very time consuming, so if you need to replicate the user information to Azure AD immediately then run `Start-ADSyncSyncCycle -PolicyType Delta`.

  - **Explanation**:

    Netlogon is a Local Security Authority service that runs in the background. It handles domain user login authentication. it maintains a secure channel between this computer and the domain controller for authenticating users and services. If this service is stopped, the computer may not authenticate users and services, and the domain controller cannot register DNS records. If this services is disabled, any services that explicitly depend on it will fail to start.

    Restarting the NetLogon service on a domain controller will not directly trigger the synchronization process between the on-premises Active Directory and Azure AD.

    To replicate the new user information to Azure AD immediately, you should use Azure AD Connect, the synchronization tool for integrating on-premises Active Directory with Azure AD. Azure AD Connect is responsible for synchronizing changes between the on-premises environment and Azure AD.

#### Scenario - on-premises Azure AD

Your company has an Azure Active Directory (Azure AD) tenant that is configured for hybrid coexistence with the on-premises Active Directory domain. The on-premise virtual environment consists of virtual machines (VMs) running on Windows Server 2012 R2 Hyper-V host servers. You have created some PowerShell scripts to automate the configuration of newly created VMs. You plan to create serveral new VMs. You need a solution that ensures the scripts are run on the new VMs.

Which of the following is the best solution?

- A. Configure a SetupComplete.cmd batch file in the %windir%\setup\scripts directory.
- B. Configure a Group Policy Object (GPO) to run the scripts as logon scripts.
- C. Configure a Group Policy Object (GPO) to run the scripts as startup scripts.
- D. Place the scripts in a new virtual hard disk (VHD).

**Correct Solution**: `Configure a SetupComplete.cmd batch file in the %windir%\setup\scripts directory`

**Explanation**:

After Windows is installed but before the logon screen appears, Windows Setup searches for the SetupComplete.cmd file in the %WINDIR%\Setup\Scripts\ directory. Reference is [here](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/add-a-custom-script-to-windows-setup?view=windows-11).

After you deploy a Virture Machine you typically need to make some changes before it's ready to use. This is something you can do manually or you could use Remote PowerShell to automate the configuration of your VM after deployment for example.

But now there's a third alternative avaliable allowing you customize your VM: the CustomScriptextension. This CustomScript extension is executed by the VM Agent and it's very straitghtforward: you specify which files it needs to download from your storage account and which file it needs to execute. You can even specify arguments that need to be passed to the script. The only requirement is that you execute a .ps1 file.

#### Scenario Create Accounts via Azure AD

You have an Azure Active Directory (Azure AD) tenant named contoso.com.

You have a CSV file that contains the names and email address of 500 external users.

You need to create a guest user account in contoso.com for each the 500 external users.

**Correct Solution**: You create a PowerShell script that runs the New-Azure ADMInvitation cmdlet for each external user.

- **Explanation**:

[Reference](https://docs.microsoft.com/en-us/powershell/module/azuread/new-azureadmsinvitation)

**Wrong Solution**:

- A: From Azure AD in the Azure portal, you use the Bulk create user operation.

- B: You create a PowerShell script that runs the New-AzureADUser cmdlet for each user.

### Certification Authority (CA)

#### Scenario for CA

Your are planning to deploy an Ubuntu Server virtual machine to your company's Azure subscription.

You are required to implement a custom deployment that includes adding a particular trusted root certification authority (CA).

Which of the following should you use to create the virtual machine?

- **Best Practice**:

  - Using [az vm create command](https://learn.microsoft.com/en-us/cli/azure/vm?view=azure-cli-latest) to customize a Linux VM as it boots for the first time via [cloud-init](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/using-cloud-init). You can use cloud-init tp install packages and write files, or to configure users and security.

  ```sh
  az vm create \
  --resource-group myResourceGroup \
  --name centos74 \
  --image OpenLogic:CentOS-CI:7-CI:latest \
  --custom-data cloud-init.txt \
  --generate-ssh-keys
  ```

### Azure Storage Redundancy

#### Scenario for Redundancy

Your company has a Microsoft Azure subscription. The company has datacenters in Los Angeles and New York.

You are configuring the two datacenters as geo-clustered sites for site resiliency. You need to recommend an Azure storage redundancy option. You have the following data storage requirements:

- Data must be stored on multiple nodes.
- Data must be stored on nodes in separate geographic locations.
- Data can be read from the secondary location as well as from the primary location.

Which of the following Azure stored redundancy options should you recommend?

- A. Geo-redundant storage
- B. Read-only geo-redundant storage
- C. Zone-redundant storage
- D. Locally redundant storage

**Correct Solution**: `Read-only geo-redundant storage`

**Explanation**:

Documentation and each storage's graphic and explanations are [here](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) and video is [here](https://www.youtube.com/watch?v=yt51iUAV7Qw).

If your applications require high availability, then you can configure your storage account for read access to the secondary region. When you enable read access to the secondary region, then your data is always available to be read from the secondary, including in a situation where the primary region becomes unavailable. Read-access geo-redundant storage (RA-GRS) or read-access geo-zone-redundant storage (RA-GZRS) configurations permit read access to the secondary region.

RA-GRS only stores on one node (datacenter) each in both the primary and secondary regions via Locally Redundant Storage (LRS). RA-GZRS would satisfy multiple nodes in the primary region via Zone Redundant Storage (ZRS), and copy to one node in the secondary region via (LRS). Microsoft docs defines a node as a single replica within a datacenter. RA-GRS is correct, as LRS in the primary region would have three replicas (nodes) within the same datacenter.

### Azure Resource Manager (ARM)

#### Scenario

Your company has an azure subscription that includes a storage account, a resource group, a blob container and file share.

A colleague named Jon Ross makes use of a solitary Azure Resource Manager (ARM) template to deploy a virtual machine and an additional Azure Storage account.

You want to review the ARM template that was used by Jon Ross.

**Correct Solution**: use the `Resource Group blade`. Reference is [here](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-export-template).

- **Best Practice**:

To view a template from deployment history:

1. Go to the resource group for your new resource group. Notice that the portal shows the result of the last deployment. Select this link.

2. You see a history of deployments for the group. In your case, the portal probably lists only one deployment. Select this deployment.

3. The portal displays a summary of the deployment. The summary includes the status of the deployment and its operations and the values that you provided for parameters. To see the template that you used for the deployment, select View template.

**Wrong Solution**:

- A: You access the Virtual Machine blade.
- B: You access the Container blade.

### Azure Virtual Machines

#### Scenario - resize VM

Your company has three virtual machines (VMs) that are included in an avaliability set. You try to resize one of the VMs, which returns an allocation failure message. It is imperative that the VM is resized.

Which of the following actions you should take?

- A. You should only stop one of the VMs.
- B. You should stop two of the VMs.
- C. You should stop all three VMs.
- D. You should remove the necessary VM from the availability set.

**Correct Solution**: stop all three VMs. Reference is [here](https://azure.microsoft.com/es-es/blog/resize-virtual-machines/).

- **Best Practice**

  If the VM you wish to resize is part if an availability set, then you must stop all VMs in the availability set before changing the size of any VM in the availability set.

- **Explanation**

  The reason all VMs in the availability set must be stopped before performing the resize operation to a size that requires different hardware is that all running VMs in the availability set must be using the same physical hardware cluster. Therefore, if a change of physical hardware cluster is required to change the VM size then all VMs must be first stopped and then restarted one-by-one to different physical hardeare clusters.

#### Scenario - attach disk to VM

You have an Azure virture machine (VM) that has a single data disk. You have been tasked with attaching this data disk to another Azure VM. You need to make sure that your strategy allows for the virtual machines to be offline for the least amount of time possible.

Which of the following is the action you should take FIRST?

- A. Stop the VM that includes the data disk.
- B. Stop the VM that the data disk must be attached to.
- C. Detach the data disk.
- D. Delete the VM that includes the data disk.

**Correct Solution**: Detach the data disk. Reference is [here](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/detach-disk).

- **Explanation**

  You can simply detach a data disk from one VM and attach it to the other VM without stopping either of the VMs.

  If you can detach a USB drive from your Windows PC without shutting it down, how is it not possible to do the same on a VM.

#### Scenario - VM with ARM 1

Your company has an Azure subscription. You need to deploy a number of Azure vitrual machines (VMs) using Azure Resource Manager (ARM) templates. You have been informed that the VMs will be included in a single availability set. You are required to make sure that the ARM template you configure allows for as many as VMs as possible to remain accessible in the event of fabric failure or maintenance.

Which of the following is the value that you should configure for the platformFaultDomainCount property?

- A. 10
- B. 30
- C. Min Value
- D. Max Value

**Correct Solution**: Max Value. Reference is [here](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/manage-availability)

- **Explanation**

The number of fault domains for managed availability sets varies by region - either two or three per region.

Each virtual machine in your availability set is assigned an update domain and a fault domain by the underlying Azure platform. For a given availability set, five non-user-configurable update domains are assigned by default (Resource Manager deployments can then be increased to provide up to [20 update domains](https://docs.microsoft.com/en-us/azure/virtual-machines/availability-set-overview)) to indicate groups of virtual machines and underlying physical hardware that can be rebooted at the same time.

#### Scenario - VM with ARM 2

You have downloaded an Azure Resource Manager (ARM) template to deploy numerous virtual machines (VMs). The ARM template is based on a current VM, but must be adapted to reference an administrative password.

You need to make sure that the password cannot be stored in plain text. You are preparing to create the necessary components to achieve your goal.

Which of the following should you create to achieve your goal?

- A. An Azure Key Vault
- B. An Azure Storage account
- C. Azure Active Directory (AD) Identity Protection
- D. An access policy
- E. An Azure policy
- F. A backup policy

**Correct Solution**: An Azure Key Vault + An access policy

- **Explanation**

You can use a template that allows you to deploy a simple Windows VM by retrieving the password that is stored in a `Key Vault`. Therefore, the password is never put in plain text in the template parameter file.

#### Scenario - Upload VM images to Azure

Your company has an Azure Active Directory (Azure AD) tenant that is configured for hybrid coexistence with the on-premises Active Directory domain. You plan to deploy several new virtual machines (VMs) in Azure. The VMs will have the same operating system and custom sofetware requirements. You configure a reference VM in the on-premise virtual environment. You then generalize the VM to create an image. You need to upload the image to Azure to ensure that it is available for selection when you create the new Azure VMs.

Which PowerShell cmdlets should you use?

- A. Add-AzVM
- B. Add-AzVhd
- C. Add-AzImage
- D. Add-AzImageData Disk

**Correct Solution**: `Add-AzVhd`

**Explanation**:

The Add-AzVhd cmdlet uploads on-premises virtual hard disks, in .vhd file format, to a blob storage account as fixed virtual hard disks. Reference [here](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/upload-generalized-managed).

- `New-AzVM` is for creating new VMs, not uploading images.
- `Add-AzImage` does not exist. The correct command is "New-AzImage".
- `Add-AzImageDataDisk` adds a data disk to an image object.

#### Scenario - Replicate Hyper-V server VM to Azure

Your company has an Azure subcription that includes a number of Azure virtual machines (VMs), which are all part of the same virtual network. Your company also has an on-premises Hyper-V server that hosts a VM, named VM1, which must be replicated to Azure.

Which of the following objects that must be created to achieve this goal?

- Hyper-V site
- Storage account
- Azure Recovery Services Vault
- Azure Traffic Manager instance
- Replication policy
- Endpoint

**Correct Solution**: `Hyper-V site` + `Azure Recovery Services Vault` + `Replication policy`

**Explanation**:

- As for the physical servers: `Storage Account` + `Azure Recovery Services Vault` + `Replication policy`. [Reference here](https://docs.microsoft.com/en-us/azure/site-recovery/physical-azure-disaster-recovery).
- In terms of Hyper-V server: `Hyper-V site` + `Azure Recovery Services Vault` + `Replication policy`. [Reference here](https://docs.microsoft.com/en-nz/azure/site-recovery/hyper-v-prepare-on-premises-tutorial).

#### Scenario - Remote VM

Your company has virtual machines (VMs) hosted in Microsoft Azure. The VMs are located in a single Azure virtual network named VNet1. The company has users that work remotely. The remote workers require access to the VMs on VNet1.

You need to probide access for the remote workders.

What should you do?

- A. Configure a Site-to-Site (S2S) VPN.
- B. Configure a VNet-toVNet VPN.
- C. Configure a Point-to-Site (P2S) VPN.
- D. Configure DirectAccess on a Windows Server 2012 server VM.
- E. Configure a Multi-Site VPN.

**Correct Solution**: Configure a Point-to-Site (P2S) VPN. [VPN gateway reference](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways) and [work remote support reference](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways).

- **Explanation**:
  - `S2S`: fixed location. It would be better if you know that the remote workers work from one location.
  - `P2S`: flexible location. From any different locations (like home, hotel) to connect the VM site.

A Point-to-Site (P2S) VPN gateway connection lets you create a secure connection to your virtual network from an individual client computer anywhere.

#### Scenario - Interal load balancer

Your company has a Microsoft SQL Server Always On availability group configured on their Azure virtual machines (VMs). You need to configure an Azure internal load balancer as a listner for the availability group.

**Correct Solution**: Enable Floating IP.

- **Explanation**: By enabling Floating IP, the load balancer will use a floating IP address as the source IP address for outbound flows from the backend pool. this will ensure that the IP address used by the backend pool remains the same even if a VM is restarted or replaced, which is important for maintaining the listener for the availability group.

**Wrong Solution**:

- A: You create an HTTP health probe on probe on port 1433

  - **Explanation**:

  Port 1433 is used by SQL Server for SQL Server Database Engine connnections. It is using TCP protocol rather than HTTP protocol.

- B: You set Session persostence to Client IP

  - **Explanation**:

  Session persistence ensures that a client will remain connected to the same server throughout a session or period of time. Because load balancing may, by default, send users to unique servers each time they connect, this can mean that complicated or repeated requests are slowed down.

  The load balancing rules configure how the load balancer routes traffic to the SQL Server instances. For this load balancer, you enable direct server return because only one of the two SQL Server instances owns the availability group listener resource at a time.

  Therefore Floating IP (direct server return) is Enabled.

  TCP 1433 is the standard SQL port. The availability group listener health probe port has to be different from the cluster core IP address health probe port.

  The ports on a health probe are TCP59999 and TCP58888. [Reference](https://learn.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/availability-group-load-balancer-portal-configure?view=azuresql)

#### Scenario Static IP on VMs

Your company has two on-premises servers named SRV01 and SRV02. Developers have created an application that runs on SRV01. The application calls a service on SRV02 by IP address.

You plan to migrate the application on Azure virtual machines (VMs). You have configured two VMs on a single subnet in an Azure virtual network.

You need to configure the two VMs with static internal IP address.

What should you do?

- A. Run the New-AzureRMVMConfig PowerShell cmdlet.
- B. Run the Set-AzureSubnet PowerShall cmdlet.
- C. Modify the VM properties in the Azure Management Portal.
- D. Modify the IP properties in Windows Network and Sharing Center.
- E. Run the Set-AzureStaticVNetIP PowerShell cmdlet.

**Correct Solution**: Run the Set-AzureStaticVNetIP PowerShell cmdlet.

- **Explanation**:

The Set-AzureStaticVNetIP PowerShell cmdlet is used to set a static internal IP address for an Azure virtual machine. This cmdlet allows you to set the IP address, subnet mask, and default gateway for the virtual machine's network interface. [Reference](https://learn.microsoft.com/en-us/powershell/module/servicemanagement/azure/set-azurestaticvnetip?view=azuresmps-4.0.0)

Option A, New-AzureRMVMConfig, is used to create a new virtual machine configuration object.

Option B, Set-AzureSubnet, is used to modify the properties of an existing Azure subnet, not to set static IP addresses for virtual machines.

Option C, modifying VM properties in the Azure Management Portal, does not provide a way to set static IP addresses for virtual machines.

Option D, modifying the IP properties in Windows Network and Sharing Center, only applies to the local network interface of the VM and does not set a static internal IP address for the VM on the Azure virtual network.

#### Scenario Recover files on VM

Your company's Azure subscription includes Azure virtual machines (VMs) that run [Windows Server 2016](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2016).

One of the VMs is backed up every day using Azure Backup Instant Restore.

When the VM becomes infected with data encryting ransomware, you decide to recover the VM's files.

Which of the following is TRUE in this scenario?

- A. You can only recover the files to the infected VM.
- B. You can recover the files to any VM within the company's subscription.
- C. You can only recover the files to a new VM.
- D. You will not be able to recover the files.

**Correct Solution**: You can recover the files to any VM within the company's subscription.

- **Explanation**:

Azure Backup Instant Restore is available for all Azure Backup VM's.

#### Scenario Resotre VM

Your company's Azure subscription includes Azure virtual machines (VMs) that run Windows Server 2016.

One of the VMs is backed up every day using Azure Backup Instant Restore.

When the VM becomes infected with data encrypting ransomware, you are required to restore the VM.

Which of the following actions should you take?

- A. You should restore the VM after deleting the infected VM.
- B. You should restore the VM to any VM within the company's subscription.
- C. You should restore the VM to a new Azure VM.
- D. You should restore the VM to an on-premise Windows device.

**Correct Solution**: You should restore the VM to a new Azure VM.

- **Explanation**:

  - [Reference to restore vms](https://docs.microsoft.com/en-us/azure/backup/backup-azure-arm-restore-vms)
  - [How to restore a system affected by ransomware](https://learn.microsoft.com/en-us/azure/backup/protect-backups-from-ransomware-faq#how-to-restore-a-system-affected-by-ransomware)

In the event of a ransomware infection on an Azure VM that is backed up using Azure Backup Instant Restore, it's generally recommended to restore the VM to a new Azure VM. This ensures that you are not using the compromised VM, and you can have confidence that the new VM is clean and unaffected by the ransomware.

Option A (restoring after deleting the infected VM) could be risky because the compromised VM might still be accessible and could potentially re-infect the new VM.

Option B (restoring to any VM within the company's subscription) is possible, but restoring to a new Azure VM is a safer approach.

Option D (restoring to an on-premise Windows device) would not be relevant for restoring an Azure VM.

### Azure Virtual Network

#### Scenario - VPN Connection with Virtual Network

You company's Azure subscription includes two Azure networks named VirtualNetworkA and VirtualNetworkB. VirtualNetworkA includes a VPN gateway that is configured to make use of static routing. Also, a site-to-sit VPN connection exists between your company's on-premises network and VirtualNetworkA.

You have ro configured a point-tosite VPN connection to Virtual NetworkA from a workstation running Windows 10. After configuring virtual network peering between VirtualNetworkA and VirtualNetworkB, you confirm that you are able to access VirtualNetworkB from the company's on-premises network. However, you find that you cannot establish a connection to VirtualNetworkB form the Windows 10 workstation.

You have to make sure that a connection to VirtualNetworkB can be established from the Windows 10 workstation.

**Correct Solution**: You download and re-install the VPN client configuration package on the Windows 10 workstation.

**Wrong Solution**:

- A: You chosse the Allow gateway transit setting on VirtualNetworkA

  - **Explanation**:

  "After configuring virtual network peering between VirtualNetworkA and VirtualNetworkB, you confirm that you are able to access VirtualNetworkB from the company's on-premises network" This indicates the `Allow/Use gateway transit` is set up working. The next step will be restart/reinstall the VPN-Client config at the windows 10 workstation.

  Reference [here](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-point-to-site-routing).

- B: You choose the Allow gateway transit setting on VirtualNetworkB.

  - **Explanation**:

  After reconfiguring \ creating peering existing point-to-site VPN connections need to be recreated.

#### Scenario Config network interface for VMs

Your company has an Azure Active Directory (Azure AD) subscription.

The VMs will each have both a public and private IP address. Inbound and outbound security rules for all of these virtual machines must be identical.

Which of the following is the least amount of network interfaces needed for this configuration?

- A. 5
- B. 10
- C. 20
- D. 40

**Correct Solution**: 5

- **Explanation**:

5 VM so 5 NIC Cards .we have public and private ip address set to them .however they needs same inbound and outbound rule so create NSG and attach to NIC and this req can be fulfilled 5 NIC hence 5 is right answer.

### Azure Monitor

#### Scenario Performance Issue

You administer a solution in Azure that is currently having performance issues.

You need to find the casuse of the performance issues pertaining to metrics on the Azure infrastructure.

Which of the following is the tool you should use?

- A. Azure Traffic Analytics
- B. Azure Monitor
- C. Azure Activity Log
- D. Azure Advisor

**Correct Solution**: [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor//data-platform)

- **Explanation**:

Metrics in Azure Monitor are stored in a time-series database which is optimized for analyzing time-stamped data. This makes metrics particularly suited for alerting and fast detection of issues.

Azure Monitor is the tool used to collect and analyze performance metrics and logs in Azure. It provides insights into the performance of Azure resources, applications, and workloads, and helps identify and troubleshoot issues related to availability, performance, and security. Azure Traffic Analytics is used to monitor and analyze network traffic, Azure Activity Log provides insights into activities performed on Azure resources, and Azure Advisor provides recommendations for improving the performance, security, and reliability of Azure resources.

### Azure Recovery Services Vault

#### Scenario Schedule backup VM to RSV

Your company has an Azure subscription that includes a Recovery Services vault.

You want to use Azure Backup to schedule backup of tour company's viryual machines (VMs) to the Recovery Services Vault.

Which of the following VMs can you back up? Choose all that apply.

- A. VMs that run Windows 10.
- B. VMs that run Windows Server 2012 or higher.
- C. VMs that have NOT been shut down.
- D. VMs that run Debian 8.2+.
- E. VMs that have been shut down.

**Correct Solution**: ABCDE

- **Explanation**:

Azure Backup supports backup of 64-bit Windows server operating system from Windows Server 2008.
Azure Backup supports backup of 64-bit Windows 10 operating system.
Azure Backup supports backup of 64-bit Debian operating system from Debian 7.9+.
Azure Backup supports backup of VM that are shutdown or offline.

[Backup reference](https://docs.microsoft.com/en-us/azure/backup/backup-support-matrix-iaas https://docs.microsoft.com/en-us/azure/virtual-machines/linux/endorsed-distros)
