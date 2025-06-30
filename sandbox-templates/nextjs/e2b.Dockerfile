# You can use most Debian-based base images
FROM node:21-slim

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Install dependencies and customize sandbox
WORKDIR /home/user/nextjs-app

RUN npx --yes create-next-app@15.3.3 . --yes

RUN npx --yes shadcn@2.7.0 init --yes -b neutral --force
RUN npx --yes shadcn@2.7.0 add --all --yes

# Create next.config.js with relaxed settings
RUN echo 'const nextConfig = {' > next.config.js \
    && echo '  images: {' >> next.config.js \
    && echo '    remotePatterns: [{' >> next.config.js \
    && echo '      protocol: "https",' >> next.config.js \
    && echo '      hostname: "**",' >> next.config.js \
    && echo '    }],' >> next.config.js \
    && echo '  },' >> next.config.js \
    && echo '  typescript: {' >> next.config.js \
    && echo '    ignoreBuildErrors: true,' >> next.config.js \
    && echo '  },' >> next.config.js \
    && echo '  eslint: {' >> next.config.js \
    && echo '    ignoreDuringBuilds: true,' >> next.config.js \
    && echo '  },' >> next.config.js \
    && echo '};' >> next.config.js \
    && echo '' >> next.config.js \
    && echo 'module.exports = nextConfig;' >> next.config.js

# Move the Nextjs app to the home directory and remove the nextjs-app directory
RUN mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app
