class Z80 {
    constructor() {
        this._clock = new Clock();
        this._registers = new CpuRegisterSet();
    }

    _clock: Clock;
    _registers: CpuRegisterSet;

    // Add E to A, leaving result in A (ADD A, E)
    ADDr_e() {
        // Perform addition
        this._registers.a += this._registers.e;

        // Clear Flags
        this._registers.f = 0;

        // Check for zero
        if (!(this._registers.a & 255)) this._registers.f |= 0x80;

        // Check for carry
        if (this._registers.a > 255) this._registers.f |= 0x10;

        // Mask to 8 bits
        this._registers.a &= 255;
    }

    // Compare B to A, setting flags (CP A, B)
    CPr_b() {
        // Temp copy of A
        let tempA = this._registers.a;

        // Subtract B
        tempA -= this._registers.b;

        // Set subtraction flag
        this._registers.f |= 0x40;

        // Check for zero
        if (!(tempA & 255)) this._registers.f |= 0x80;

        // Check for underflow
        if (tempA < 0) this._registers.f |= 0x10;

        // 1 M-time taken
        this._registers.clock.m = 1;
        this._registers.clock.t = 4;
    }

    NOP() {
        // 1 M-time taken
        this._registers.clock.m = 1;
        this._registers.clock.t = 4;
    }
}

class Clock {
    constructor() {
        this.m = 0;
        this.t = 0;
    }

    m: number;
    t: number;
}

class CpuRegisterSet {
    constructor() {
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.d = 0;
        this.e = 0;
        this.h = 0;
        this.l = 0;
        this.f = 0;

        this.pc = 0;
        this.sp = 0;

        this.clock = new Clock();
    }

    // 8 bit registers
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    h: number;
    l: number;
    f: number;

    // 16 bit registers
    pc: number;
    sp: number;

    clock: Clock;

}