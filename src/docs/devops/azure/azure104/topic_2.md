# Azure 104 Preparation

## Documentation

- [Azure 104 exam](https://www.examtopics.com/exams/microsoft/az-104/view/)

- [Azure docs](https://learn.microsoft.com/en-us/azure/?product=popular)

- [Azure 104 learn path](https://learn.microsoft.com/en-us/credentials/certifications/exams/az-104/)

## Topic 2

### Role

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
