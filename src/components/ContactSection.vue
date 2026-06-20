<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import {
  Send,
  Github,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-vue-next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const formRef = ref(null);

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const errors = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isLoading = ref(false);
const isSuccess = ref(false);

const socials = [
  {
    icon: Github,
    href: "https://github.com/RizkyYuliAndreanto",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/rizky-yuli-andreanto/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/eryry07",
    label: "Instagram",
  },
  { icon: Mail, href: "mailto:rizkyandreanto123@gmail.com", label: "Email" },
];

function validate() {
  let valid = true;
  errors.name = "";
  errors.email = "";
  errors.subject = "";
  errors.message = "";

  if (!form.name.trim()) {
    errors.name = "Name is required";
    valid = false;
  }
  if (!form.email.trim()) {
    errors.email = "Email is required";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email";
    valid = false;
  }
  if (!form.subject.trim()) {
    errors.subject = "Subject is required";
    valid = false;
  }
  if (!form.message.trim()) {
    errors.message = "Message is required";
    valid = false;
  }
  return valid;
}

async function handleSubmit() {
  if (!validate()) return;
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  isLoading.value = false;
  isSuccess.value = true;
  form.name = "";
  form.email = "";
  form.subject = "";
  form.message = "";
  setTimeout(() => {
    isSuccess.value = false;
  }, 4000);
}

let ctx = null;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // Header chars fall in
    gsap.from(".contact-header-char", {
      y: -120,
      opacity: 0,
      rotation: () => gsap.utils.random(-45, 45),
      duration: 0.7,
      stagger: 0.03,
      ease: "bounce.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 70%",
      },
    });

    // Left info panel slides in
    gsap.from(".contact-info", {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 60%",
      },
    });

    // Form slides in from right
    gsap.from(formRef.value, {
      x: 80,
      opacity: 0,
      rotateY: -10,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 60%",
      },
    });

    // Social icons pop in
    gsap.from(".social-icon", {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 50%",
      },
    });

    // Form fields stagger in
    gsap.from(".form-field", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 50%",
      },
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

function splitChars(text) {
  return text.split("");
}
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="py-24 md:py-32 bg-[#0A0D18] overflow-hidden"
    style="perspective: 1000px">
    <div class="max-w-[90rem] mx-auto px-6">
      <!-- Editorial Header -->
      <div
        class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-8">
        <h2
          class="text-5xl md:text-7xl lg:text-[6rem] font-black font-oswald text-[#F2F2F2] uppercase tracking-tighter leading-[0.9]">
          <span class="block text-accent">
            <span
              v-for="(char, ci) in splitChars('GET IN')"
              :key="'g' + ci"
              class="contact-header-char inline-block"
              :style="char === ' ' ? 'width: 0.3em' : ''"
              >{{ char === " " ? "\u00A0" : char }}</span
            >
          </span>
          <span class="block">
            <span
              v-for="(char, ci) in splitChars('TOUCH.')"
              :key="'t' + ci"
              class="contact-header-char inline-block"
              >{{ char }}</span
            >
          </span>
        </h2>
        <p
          class="text-xs sm:text-sm text-text-secondary uppercase tracking-[0.2em] leading-relaxed max-w-sm font-oswald lg:pb-2 text-left lg:text-right">
          HAVE A PROJECT IN MIND? LET'S BUILD SOMETHING GREAT TOGETHER.
        </p>
      </div>

      <!-- Content: Info + Form side by side -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
        <!-- Left: Contact Info -->
        <div class="contact-info flex flex-col justify-center gap-10">
          <!-- Contact details -->
          <div class="space-y-6">
            <a
              href="mailto:rizkyandreanto123@gmail.com"
              class="flex items-center gap-4 group">
              <div
                class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
                <Mail class="w-5 h-5" />
              </div>
              <div>
                <p
                  class="text-[10px] font-oswald uppercase tracking-widest text-white/40 mb-0.5">
                  Email
                </p>
                <p
                  class="text-sm text-white/80 font-oswald group-hover:text-accent transition-colors">
                  rizkyandreanto123@gmail.com
                </p>
              </div>
            </a>

            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent">
                <MapPin class="w-5 h-5" />
              </div>
              <div>
                <p
                  class="text-[10px] font-oswald uppercase tracking-widest text-white/40 mb-0.5">
                  Location
                </p>
                <p class="text-sm text-white/80 font-oswald">Indonesia</p>
              </div>
            </div>
          </div>

          <!-- Social links -->
          <div>
            <p
              class="text-[10px] font-oswald uppercase tracking-widest text-white/40 mb-4">
              Connect With Me
            </p>
            <div class="flex gap-3">
              <a
                v-for="social in socials"
                :key="social.label"
                :href="social.href"
                :aria-label="social.label"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/40 hover:scale-110 transition-all duration-300">
                <component :is="social.icon" class="w-4 h-4" />
              </a>
            </div>
          </div>

          <!-- Decorative text -->
          <p
            class="text-[10px] text-white/20 uppercase tracking-[0.3em] font-oswald leading-loose hidden lg:block">
            AVAILABLE FOR FREELANCE<br />
            AND FULL-TIME OPPORTUNITIES.<br />
            LET'S CREATE SOMETHING AMAZING.
          </p>
        </div>

        <!-- Right: Form -->
        <div
          ref="formRef"
          class="relative"
          style="transform-style: preserve-3d">
          <!-- Form card -->
          <div
            class="relative bg-[#12182B] border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <!-- Glare -->
            <div
              class="absolute inset-0 z-10 pointer-events-none rounded-2xl bg-gradient-to-br from-white/[0.02] via-transparent to-transparent"></div>

            <form
              @submit.prevent="handleSubmit"
              class="relative z-20 space-y-4">
              <!-- Name + Email row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="form-field">
                  <label
                    class="text-[9px] font-oswald uppercase tracking-widest text-white/40 mb-1.5 block"
                    >Name</label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Your Name"
                    class="w-full px-4 py-3 bg-[#0A0D18] border border-white/10 rounded-lg text-sm text-white placeholder-white/20 font-oswald focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all" />
                  <span
                    v-if="errors.name"
                    class="text-[10px] text-red-400 mt-1 block"
                    >{{ errors.name }}</span
                  >
                </div>
                <div class="form-field">
                  <label
                    class="text-[9px] font-oswald uppercase tracking-widest text-white/40 mb-1.5 block"
                    >Email</label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="your@email.com"
                    class="w-full px-4 py-3 bg-[#0A0D18] border border-white/10 rounded-lg text-sm text-white placeholder-white/20 font-oswald focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all" />
                  <span
                    v-if="errors.email"
                    class="text-[10px] text-red-400 mt-1 block"
                    >{{ errors.email }}</span
                  >
                </div>
              </div>

              <!-- Subject -->
              <div class="form-field">
                <label
                  class="text-[9px] font-oswald uppercase tracking-widest text-white/40 mb-1.5 block"
                  >Subject</label
                >
                <input
                  v-model="form.subject"
                  type="text"
                  placeholder="Project Inquiry"
                  class="w-full px-4 py-3 bg-[#0A0D18] border border-white/10 rounded-lg text-sm text-white placeholder-white/20 font-oswald focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all" />
                <span
                  v-if="errors.subject"
                  class="text-[10px] text-red-400 mt-1 block"
                  >{{ errors.subject }}</span
                >
              </div>

              <!-- Message -->
              <div class="form-field">
                <label
                  class="text-[9px] font-oswald uppercase tracking-widest text-white/40 mb-1.5 block"
                  >Message</label
                >
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="Tell me about your project..."
                  class="w-full px-4 py-3 bg-[#0A0D18] border border-white/10 rounded-lg text-sm text-white placeholder-white/20 font-oswald focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all resize-none" />
                <span
                  v-if="errors.message"
                  class="text-[10px] text-red-400 mt-1 block"
                  >{{ errors.message }}</span
                >
              </div>

              <!-- Submit -->
              <div class="form-field pt-2">
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="w-full py-3.5 px-6 bg-accent hover:bg-accent/80 text-white font-oswald font-bold uppercase tracking-widest text-sm rounded-lg flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]">
                  <span
                    v-if="isLoading"
                    class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <template v-else>
                    <Send class="w-4 h-4" />
                    Send Message
                  </template>
                </button>
              </div>

              <!-- Success message -->
              <div
                v-if="isSuccess"
                class="text-center text-xs text-green-400 py-2 font-oswald uppercase tracking-widest">
                Message sent successfully! I'll get back to you soon.
              </div>
            </form>
          </div>

          <!-- 3D depth edges -->
          <div
            class="absolute inset-y-0 -right-[3px] w-[3px] bg-gradient-to-b from-accent/20 via-white/5 to-transparent rounded-r-2xl"></div>
          <div
            class="absolute -bottom-[3px] inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-accent/10 to-transparent rounded-b-2xl"></div>
        </div>
      </div>
    </div>
  </section>
</template>
