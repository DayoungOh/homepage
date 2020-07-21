from setuptools import setup, find_packages

install_requires = [
    "flask",
]

setup(
    name='packus',
    version='0.1',
    author='packus',
    packages=find_packages(),
    install_requires=install_requires,
)