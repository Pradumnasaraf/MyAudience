export const PLATFORMS = [
  { name: 'YouTube', icon: 'fa-brands fa-youtube', className: 'youtube', color: '#FF0000' },
  { name: 'GitHub', icon: 'fa-brands fa-github', className: 'github', color: '#181717' },
  { name: 'Twitter', icon: 'fa-brands fa-x-twitter', className: 'twitter', color: '#000000' },
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', className: 'linkedin', color: '#0077B5' },
  { name: 'Dev.to', icon: 'fa-brands fa-dev', className: 'devto', color: '#0C0D0E' },
  { name: 'Hashnode', icon: 'fa-brands fa-hashnode', className: 'hashnode', color: '#2962FF' },
  { name: 'Bluesky', icon: 'fa-brands fa-bluesky', className: 'bluesky', color: '#0085FF' },
  { name: 'Threads', icon: 'fa-brands fa-threads', className: 'threads', color: '#000000' }
];

export const INITIAL_FOLLOWERS = {
  YouTube: 0,
  GitHub: 0,
  Twitter: 0,
  LinkedIn: 0,
  'Dev.to': 0,
  Hashnode: 0,
  Bluesky: 0,
  Threads: 0
};

export const STORAGE_KEYS = {
  FOLLOWERS: 'platformFollowers',
  HISTORY: 'history',
  LAST_UPDATED: 'lastUpdated'
};

export const CHART_OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#FFFFFF',
      titleColor: '#1F2937',
      bodyColor: '#1F2937',
      borderColor: '#E5E7EB',
      borderWidth: 1
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0,0,0,0.1)'
      }
    },
    x: {
      grid: {
        color: 'rgba(0,0,0,0.1)'
      }
    }
  }
};

export const META_TAGS = {
  title: 'Audience Calculator - Track Your Social Media Following',
  description: 'Track and calculate your total social media audience across YouTube, GitHub, Twitter, LinkedIn, Dev.to, Hashnode, Bluesky, and Threads.',
  ogImage: '/og-image.png'
}; 