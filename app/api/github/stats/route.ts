import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const octokit = new Octokit({ auth: token });

    // Get user data
    const { data: user } = await octokit.users.getAuthenticated();

    // Get user repos
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
    });

    // Calculate stats
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languages = repos
      .filter(repo => repo.language)
      .reduce((acc: any, repo) => {
        acc[repo.language!] = (acc[repo.language!] || 0) + 1;
        return acc;
      }, {});

    const topLanguages = Object.entries(languages)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 5)
      .map(([lang]) => lang);

    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      stats: {
        totalStars,
        totalForks,
        totalRepos: repos.length,
        topLanguages,
      },
      repos: repos.slice(0, 6).map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
      })),
    });
  } catch (error: any) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
