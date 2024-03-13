export class SendApplicationModel {
    applicationCopy: File[];
    passportCopy: File[];
    planeCopy: File[];
    ownDocsCopy: File[];
    powerOfAttorneyCopy: File[];
    constituentDocsCopy: File[];
    otherDocs: File[];
    reason: string;
    city: string;
    address: string;
    maxPower: string;
    powerLevel: string;
    paymentsOption: string;
    provider: string;

    constructor (
        applicationCopy: File[],
        passportCopy: File[],
        planeCopy: File[],
        ownDocsCopy: File[],
        powerOfAttorneyCopy: File[],
        constituentDocsCopy: File[],
        otherDocs: File[],
        reason: string,
        city: string,
        address: string,
        maxPower: string,
        powerLevel: string,
        paymentsOption: string,
        provider: string
    ) {
        this.applicationCopy = applicationCopy;
        this.passportCopy = passportCopy;
        this.planeCopy = planeCopy;
        this.ownDocsCopy = ownDocsCopy;
        this.powerOfAttorneyCopy = powerOfAttorneyCopy;
        this.constituentDocsCopy = constituentDocsCopy;
        this.otherDocs = otherDocs;
        this.reason = reason;
        this.city = city;
        this.address = address;
        this.maxPower = maxPower;
        this.powerLevel = powerLevel;
        this.paymentsOption = paymentsOption;
        this.provider = provider;
    }
}