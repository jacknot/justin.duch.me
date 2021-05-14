---
title: Why Apple Silicon Is A Big Deal
thumbnail: apple-silicon-thumb.png
---

The experience curve is a model expressing the relationship between experience producing a good and efficiency of production[^1]. It refers to the effect that firms learn from doing, which means that the higher the cumulative volume of production, the lower the direct cost per new unit produced.

Back in the 1980's - 1990's Apple, along with Power PC, Sun, and other engineering workstation manufacturers had embraced the Reduced Instruction Set Computing (RISC) architecture. These were much simpler with a smaller instruction set compared to x86 chips. Even though you had to execute more instructions to complete a given task, these chips were much more efficient than the x86 chips made by Intel that had a bloated, inefficient instruction set.

This was a good plan, but it ran into problems with the experience curve. As the Intel x86 chips had a huge market share lead over RISC, the cumulative production was doubling very quickly in the Intel world, and was doubling very slowly in the RISC world. So, over a period of years, the Intel platform was improving so rapidly that they had opened up a large gap in price per unit of performance over the RISC architecture.

Apple’s designs and software were elegant, but its customers were paying a premium price for the meagre performance of the RISC architecture. The solution was to convert Apple to the Intel platform. It caused many problems for developers in the short term, but it put Apple on the same experience curve as the Intel-based PCs.

That brings us to today. Intel still has the biggest market share in personal computers, but these days, personal computers are a tiny part of the overall market for silicon chips. Phones and tablets now sell way more units that personal computers. The leading phones and tablets use ARM chips (which are based on RISC), and are currently on a much faster experience curve than Intel and are improving performance and reducing costs at a much faster rate.

With ARM CPUs closing in on x86 performance, and Intel completely dropping the ball on their newer chips[^2], Apple has decided to phase out its use of Intel CPUs for ARM hardware in its Macs over the next two years.

These are exciting times. I feel that this industry, much more than others, has always had to live with the mistakes of the past out of an inability to disrupt the space. Moving from x86 to ARM is no easy feat and will probably cause a lot of pain for a lot of developers as it did before, but I applaud Apple for being the first one to make such a change in the personal computer scene.

Also, I know I'm a month late, but I watched all the WWDC talks before writing this and some of them were a real slog to go through.

But back to the topic on hand. The current Intel based Macs contain a multicore CPU and many have a discreet GPU. Recent Macs also have a T2 chip which enables features such as Apple Pay, and Touch ID. Machines with a discrete GPU also have separate memory spaces for the CPU and GPU.

The new Apple silicon Macs combine all these components into a single system on a chip or SoC. Building everything into one chip gives a system a unified memory architecture. This means that the GPU and CPU are working over the same memory. Graphics resources such as textures, images and geometry data can be shared between the CPU and GPU efficiently with no overhead as there's no need to copy data across a PCIe bus.

With Apple controlling the entire software and hardware stack, we should see more efficient implementations of software, just like we see on the iPhone and iPad. Along with using ARM architecture this means a longer lasting and more consistent battery life.

And with a SoC, Apple will be able to integrate more chips in a smaller space. This could make for a substantially denser and more compact motherboard - motherboards that more resemble the iPad motherboard than a traditional notebook motherboard. This would free room in the machine for either, other hardware enhancements, or a slimmer and lighter package overall.

Apple have also hinted that the integrated graphics of their SoC have better performance than discrete graphics. If this were the case they could drop discrete graphics (and all the cooling it needs) on the 16 inch model MacBook, which again, leaves more space for other improvements.

The per-unit cost of Apple silicon based chips will likely be substantially lower than Intel-based chips. Apple’s newest chip, the A13, is found on the iPhone SE which costs AUD$750. It's impossible to say precisely how much the SoC itself costs, but given the cost of the iPhone SE, it's likely on the order of dozens of dollars.

Meanwhile they’re likely paying Intel hundreds of dollars for each Mac to use their chips. Those savings could be used to pad Apple's profit margins, or they could be used to create Macs that are substantially cheaper or more capable than ever before (but most likely the former). Although, given that MacBooks, from a hardware perspective, aren't much more than a beefy iPad with keyboard attached, I wouldn't be surprised at all to see a AUD$1200 to AUD$1400 MacBook in the near future.

Control of the hardware also allows Apple to develop security features for the Mac on par with the iPhone.

Apple silicon enforces a restriction called Write XOR Execute. That means that memory pages can be either writable or executable, but never both at the same time. Pages that are both writable and executable can be a dangerous security vulnerability. However many modern applications embed just-in-time compilers to support languages such as Java or JavaScript. These JIT compilers frequently rely on memory being both writable and executable.

To solve this they are adding a new API that allows memory to be quickly toggled between writable and executable permissions. This works per thread, so two threads can see different permissions for the same page making it very easy to adopt in multi-threaded JITs.

A great security feature coming from the iPhone is hardware support in the memory controller to make the OS kernel code immutable. Once the kernel has been loaded into memory, kernel integrity protection prevents memory pages containing kernel code from being modified or additional pages from being made executable.

There's also pointer authentication. But ROP is fun so I don't want to talk about it. Yes, I'm okay with Kernel Integrity Protection making a closed off system even more closed off, but not letting me ROP is where I draw the line.

But on the subject of closing off the system, all these security features impact kernel extension development. To be able to support Kernel Integrity Protection they had to change how macOS loads kernel extensions, which means this now requires a reboot.

Brining us to the new boot process. On Apple silicon Macs, the boot process is based on secure boot architecture of iOS and iPadOS. Secure boot ensures that each start-up component is cryptographically signed by Apple and that the boot happens only after the verification of the chain of trust.

For the current Macs in order to use Bootcamp you just have to turn off System Integrity Protection, but with Secure boot and the new ARM chips this is less likely to work. You can turn off Secure boot, and there are in fact ARM images for Windows but I still doubt it could happen.

Most of these features including the new OS features in the upcoming macOS Big Sur, look like Apple trying to unify all their devices. Which is a great thing in my opinion, a big reason for why I buy Apple products is continuity between devices.

Of course, I still have some issues. I would have much preferred them to adopt RISC-V instead of ARM because it's a more open platform. Although I admit it would be a mistake to do so right now, RISC-V is simply not ready but even so, everything that is making ARM attractive right now is applicable to RISC-V especially since it is so much easier to add custom logic.

Like with Bootcamp there could also be problems with visualization. It is very likely that ARM-based Macs will lack a performant hypervisor upon release. Apple has `Hypervisor.framework`[^3] which has been updated for ARM Mac, but it's still up to vendors like VMware and Docker to respond and start using it.

We'll have to wait and see until the first Macs come with Apple silicon to see if it was truly worth it, but it will be nice to finally not have to deal with an x86 ISA.

---

[^1]: https://en.wikipedia.org/wiki/Experience\_curve\_effects

[^2]: https://www.pcgamer.com/intel-skylake-why-apple-left/

[^3]: https://developer.apple.com/documentation/hypervisor/apple\_silicon
