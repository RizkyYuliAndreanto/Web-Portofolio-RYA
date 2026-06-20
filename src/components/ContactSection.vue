<script setup>
import { ref, reactive } from "vue";
import { Send } from "lucide-vue-next";

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

  // Simulate EmailJS send (replace with real service/template IDs)
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
</script>

<template>
  <section id="contact" class="py-24 md:py-32 px-6">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-5xl font-bold text-text mb-4">
          Get In <span class="text-accent">Touch</span>
        </h2>
        <p class="text-text-secondary">
          Have a project in mind? Let's build something great together.
        </p>
      </div>

      <div
        class="backdrop-blur-xl bg-surface/80 border border-white/10 rounded-2xl p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <div class="relative">
              <input
                v-model="form.name"
                type="text"
                placeholder="Your Name"
                class="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text placeholder-text-secondary/50 focus:outline-none focus:border-accent focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all" />
            </div>
            <span v-if="errors.name" class="text-xs text-red-400 mt-1 block">{{
              errors.name
            }}</span>
          </div>

          <div>
            <div class="relative">
              <input
                v-model="form.email"
                type="email"
                placeholder="Your Email"
                class="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text placeholder-text-secondary/50 focus:outline-none focus:border-accent focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all" />
            </div>
            <span v-if="errors.email" class="text-xs text-red-400 mt-1 block">{{
              errors.email
            }}</span>
          </div>

          <div>
            <div class="relative">
              <input
                v-model="form.subject"
                type="text"
                placeholder="Subject"
                class="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text placeholder-text-secondary/50 focus:outline-none focus:border-accent focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all" />
            </div>
            <span
              v-if="errors.subject"
              class="text-xs text-red-400 mt-1 block"
              >{{ errors.subject }}</span
            >
          </div>

          <div>
            <div class="relative">
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="Your Message"
                class="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text placeholder-text-secondary/50 focus:outline-none focus:border-accent focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all resize-none" />
            </div>
            <span
              v-if="errors.message"
              class="text-xs text-red-400 mt-1 block"
              >{{ errors.message }}</span
            >
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 px-6 bg-accent hover:bg-primary text-text font-medium rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <span
              v-if="isLoading"
              class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <template v-else>
              <Send class="w-4 h-4" />
              Send Message
            </template>
          </button>

          <div v-if="isSuccess" class="text-center text-sm text-green-400 py-2">
            Message sent successfully! I'll get back to you soon.
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
