#!/usr/bin/ruby

# frozen_string_literal: true

require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }
  gem "jekyll"
end

# was trying to use these tweaks to make this run in a sort of pluggable manner and build an editor around it 
# for my website or these sort of websites
require 'jekyll'

conf = Jekyll.configuration({
  'source'      => '.',
  'destination' => '_site/'
})
Jekyll::Commands::Build.process(conf)

# site = Jekyll::Site.new(conf).process