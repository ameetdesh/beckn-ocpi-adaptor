import { z } from "zod";

export default z.array(z.enum(["UPI","CreditCard","DebitCard","Wallet","BankTransfer","Cash","ApplePay"])).describe("Payment methods accepted for this offer");
