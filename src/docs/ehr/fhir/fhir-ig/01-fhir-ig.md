# FHIR Implementation Guide and Package

## How to create a FHIR IG

### Workflow for building a FHIR Spec

![image](/fhir/02-fhir-ig/02-fhir-spec.png)

#### FHIR Ecosystem

![image](/fhir/02-fhir-ig/03-fhir-eco.png)


##### FHIR EcoSys Details - Firely suite of products

![image](/fhir/02-fhir-ig/04-fhir-eco-details.png)

### Useful guides

- [IG Publisher Documentation](https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation)
- [Simple IG Template GitHub](https://github.com/FHIR/sample-ig)
- [IG Template FHIR GitHub](https://github.com/HL7/ig-template-fhir/tree/master)
- [Guidance for FHIR IG Creation](https://build.fhir.org/ig/FHIR/ig-guidance/index.html)
- [Let's Build a FHIR Spec - Simplifier.net by Firely](https://simplifier.net/letsbuildafhirspec-simplifier.netbyfirely)

### Create a template from Simplifier.net

- Access [Simplifier.net](https://simplifier.net/) on your broswer and log in.
- Under your `Portal`, (Click your icon and click Portal).
- Click `Creat Your First Project`
- [Video for build an IG](https://www.google.com/search?q=how+to+use+Simplifier.net+to+create+a+project%3F&rlz=1C1GCEA_enNZ995NZ995&oq=how+to+use+Simplifier.net+to+create+a+project%3F&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigAdIBCjIwMTkyajBqMTWoAgCwAgA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:2a8dfac5,vid:ESGPNwyXx_s,st:0)
- [Video for build package](https://www.youtube.com/watch?v=ItpBlnldMPo)
- [Video for Forge and Simplifier](https://www.youtube.com/watch?v=nF3DZ26ckVI)

## What the relationship between FHIR IG and FHIR Package?

When we start a FHIR Implementation, we need to create a FHIR Package (E.G., via [Simplifier.net](https://simplifier.net/)). In our package We can abusolutely define our structure via FHIR resources for our research purpose, and we also can re-define the ValueSets, the CodeSystems and etc. what's more we can add extensions in each FHIR resource, for example, we can add `ethnicity` and `nzCitizen` in FHIR Patient resource (version R4), and we can rename it to `myPatient` resource in our package. 

After we built our own fhir package we can register it to [HL7 FHIR PACKAGE REGISTRY](https://registry.fhir.org/), then we can use it in a FHIR server (if it support third party registry packages). It just like we create a JavaScript or Python package, then we publish it on NPM or PYPI, and we use it in our project. 

However, there is an issue, you maybe noticed. Where the documentations of the package? For example, when we create a python package, we also need to write a user documentation for it, this is because when we publish it for others to use, we need to provide a clear guides/examples for other users to use our package. So, the `FHIR Implementation Guide` comes out, we can write a clear documentation for our FHIR package based on FHIR offical principle.

We can find a template of FHIR Implemetation Guide on [Simple IG Template GitHub](https://github.com/FHIR/sample-ig), [IG Template FHIR GitHub](https://github.com/HL7/ig-template-fhir/tree/master), or [Simplifier.net](https://simplifier.net/) etc. The easiest way is using [Simplifier.net](https://simplifier.net/), it provides functions for us to build the package and FHIR IG via fhirly template. And the Simplifier.net also provide the software -  `Forge` for us to create our resources, we can load our resources from `Forge` to Simplifier.net website to create our FHIR IG and package.

### Why Simplifier and Forge?
- Make FHIR development easier, so everyone in a team can help.
- Provide governance across multiple FHIR projects.

- Simplifier works with all FHIR tools, bringing governance to all.

![image](/fhir/02-fhir-ig/05-fhir-eco-tools.png)

  - [Simplifier FSH playground](https://simplifier.net/fsh): ...
  - [Simplifier yamlgen playground](https://simplifier.net/yamlgen?scope=hl7.fhir.r4.core@4.0.1):for create FHIR examples.
  - [Simplifier Forge](https://simplifier.net/forge): for create FHIR Resource Profiles.
  - [Forge documentation](https://docs.fire.ly/projects/Forge/).
  - [Ontoserver Snapper](https://ontoserver.csiro.au/snapper/index.html?#/): for create Value Sets and FHIR Code System.



## How to using FHIR registry Package in FHIR server (Hapi FHIR Server)

- Clone [hapi-fhir-jpaserver-starter](https://github.com/hapifhir/hapi-fhir-jpaserver-starter)
- Under `src/main/reources/application.yaml`
    - Line 80 `implementationguides`
    - We can edit and use third party registry here.

    ```yaml
        implementationguides:
        ##    example from registry (packages.fhir.org)
        swiss:
            name: swiss.mednet.fhir
            version: 0.8.0
            reloadExisting : false
            # example not from registry
            ips_1_0_0:
                packageUrl: https://build.fhir.org/ig/HL7/fhir-ips/package.tgz
                name: hl7.fhir.uv.ips
                version: 1.0.0
            supported_resource_types:
            - Patient
            - Observation
    ``` 
