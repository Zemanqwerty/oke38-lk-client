export class EditApplicationData{
    reason: string;
    city: string;
    address: string;
    maxPower: string;
    powerLevel: string;
    paymentsOption: string;
    provider: string;

    constructor (
        reason: string,
        city: string,
        address: string,
        maxPower: string,
        powerLevel: string,
        paymentsOption: string,
        provider: string,
    ) {
        this.reason = reason;
        this.city = city;
        this.address = address;
        this.maxPower = maxPower;
        this.powerLevel = powerLevel;
        this.paymentsOption = paymentsOption;
        this.provider = provider;
    }
}